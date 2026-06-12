"use server";

import { intakeSchema } from "@/lib/intake/schema";
import { sendIntake } from "@/lib/intake/send";

export type IntakeActionState = {
  ok: boolean;
  message: string;
  calendlyUrl?: string;
  fieldErrors?: Record<string, string[]>;
};

function optionalString(value: FormDataEntryValue | null): string | undefined {
  const text = String(value ?? "").trim();
  return text || undefined;
}

export async function submitIntake(
  _prev: IntakeActionState,
  formData: FormData,
): Promise<IntakeActionState> {
  const interests = formData.getAll("interests") as string[];

  const parsed = intakeSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    consultType: formData.get("consultType"),
    bestTime: formData.get("bestTime"),
    interests,
    mainGoal: formData.get("mainGoal"),
    exerciseHistory: formData.get("exerciseHistory"),
    injuries: optionalString(formData.get("injuries")),
    daysPerWeek: formData.get("daysPerWeek"),
    trainerBefore: formData.get("trainerBefore"),
    biggestObstacle: optionalString(formData.get("biggestObstacle")),
    nutritionInterest: formData.get("nutritionInterest"),
    referralSource: optionalString(formData.get("referralSource")) || undefined,
    additionalNotes: optionalString(formData.get("additionalNotes")),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.website) {
    return { ok: true, message: "Thank you! We'll be in touch soon." };
  }

  const { website: _honeypot, ...payload } = parsed.data;

  try {
    const result = await sendIntake(payload);
    return {
      ok: true,
      message:
        "Thank you! We'll reach out within one business day to schedule your free consultation.",
      calendlyUrl: result.calendlyUrl,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong. Please try again.";
    return { ok: false, message };
  }
}
