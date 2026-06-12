import type { IntakePayload } from "./schema";
import {
  consultTypeLabels,
  daysPerWeekLabels,
  exerciseHistoryLabels,
  referralLabels,
  yesNoUnsureLabels,
} from "./schema";
import { pillarLabels } from "@/lib/content/pillars";

const bestTimeLabels: Record<IntakePayload["bestTime"], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

function formatPayload(payload: IntakePayload): string {
  const interests = payload.interests
    .map((id) => pillarLabels[id])
    .join(", ");

  const lines = [
    `New consultation request from ${payload.firstName} ${payload.lastName}`,
    "",
    "── Contact ──",
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Consultation type: ${consultTypeLabels[payload.consultType]}`,
    `Best time to reach: ${bestTimeLabels[payload.bestTime]}`,
  ];

  if (payload.referralSource) {
    lines.push(`How they heard about us: ${referralLabels[payload.referralSource]}`);
  }

  lines.push(
    "",
    "── Goals & interests ──",
    `Interested in: ${interests}`,
    `Main goal: ${payload.mainGoal}`,
    `Nutrition guidance: ${yesNoUnsureLabels[payload.nutritionInterest]}`,
  );

  if (payload.biggestObstacle) {
    lines.push(`Biggest obstacle: ${payload.biggestObstacle}`);
  }

  lines.push(
    "",
    "── Training background ──",
    `Exercise history: ${exerciseHistoryLabels[payload.exerciseHistory]}`,
    `Days per week available: ${daysPerWeekLabels[payload.daysPerWeek]}`,
    `Worked with a trainer before: ${yesNoUnsureLabels[payload.trainerBefore]}`,
  );

  if (payload.injuries) {
    lines.push(`Injuries / limitations: ${payload.injuries}`);
  }

  if (payload.additionalNotes) {
    lines.push("", "── Additional notes ──", payload.additionalNotes);
  }

  return lines.join("\n");
}

async function sendViaResend(payload: IntakePayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is required when INTAKE_PROVIDER=resend");
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const to =
    process.env.INTAKE_TO_EMAIL ?? "GetFit@WellnessZone.com";
  const from =
    process.env.INTAKE_FROM_EMAIL ?? "Wellness Zone <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `New consultation: ${payload.firstName} ${payload.lastName}`,
    text: formatPayload(payload),
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function sendViaWebhook(payload: IntakePayload): Promise<void> {
  const url = process.env.INTAKE_WEBHOOK_URL;
  if (!url) {
    throw new Error(
      "INTAKE_WEBHOOK_URL is required when INTAKE_PROVIDER=webhook",
    );
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: "wellness-zone-get-started",
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with status ${response.status}`);
  }
}

export type SendIntakeResult = {
  ok: true;
  calendlyUrl?: string;
};

export async function sendIntake(
  payload: IntakePayload,
): Promise<SendIntakeResult> {
  const provider = process.env.INTAKE_PROVIDER;
  const isProd = process.env.NODE_ENV === "production";

  switch (provider) {
    case "resend":
      await sendViaResend(payload);
      return { ok: true };
    case "webhook":
      await sendViaWebhook(payload);
      return { ok: true };
    case "calendly": {
      if (process.env.INTAKE_WEBHOOK_URL) {
        await sendViaWebhook(payload);
      } else if (!isProd) {
        console.info("[intake:dev:calendly]", formatPayload(payload));
      }
      return { ok: true, calendlyUrl: process.env.CALENDLY_URL };
    }
    default:
      if (isProd) {
        throw new Error(
          "INTAKE_PROVIDER is not configured. Set resend, webhook, or calendly in production.",
        );
      }
      console.info("[intake:dev]", formatPayload(payload));
      return { ok: true };
  }
}
