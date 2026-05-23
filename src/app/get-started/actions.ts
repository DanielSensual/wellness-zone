"use server";

import { intakeSchema, type IntakeFormData } from "@/lib/intake/schema";
import { sendIntake } from "@/lib/intake/send";

export type IntakeActionState = {
  ok: boolean;
  message: string;
  calendlyUrl?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitIntake(
  _prev: IntakeActionState,
  formData: FormData,
): Promise<IntakeActionState> {
  const interests = formData.getAll("interests") as string[];

  const parsed = intakeSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    bestTime: formData.get("bestTime"),
    interests,
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

  const payload: IntakeFormData = {
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    bestTime: parsed.data.bestTime,
    interests: parsed.data.interests,
  };

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
