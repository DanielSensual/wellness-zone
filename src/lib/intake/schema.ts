import { z } from "zod";

export const interestOptions = ["moving", "eating", "living"] as const;
export const bestTimeOptions = ["morning", "afternoon", "evening"] as const;
export const consultTypeOptions = ["in-person", "phone"] as const;
export const exerciseHistoryOptions = [
  "new",
  "under-6-months",
  "6-months-plus",
  "years",
] as const;
export const daysPerWeekOptions = ["1-2", "3-4", "5-plus"] as const;
export const yesNoUnsureOptions = ["yes", "no", "unsure"] as const;
export const referralOptions = [
  "google",
  "social-media",
  "friend-family",
  "drive-by",
  "other",
] as const;

export const consultTypeLabels: Record<
  (typeof consultTypeOptions)[number],
  string
> = {
  "in-person": "In-person at the studio",
  phone: "Phone or video call",
};

export const exerciseHistoryLabels: Record<
  (typeof exerciseHistoryOptions)[number],
  string
> = {
  new: "I'm just getting started",
  "under-6-months": "Less than 6 months",
  "6-months-plus": "6 months to a few years",
  years: "Several years or more",
};

export const daysPerWeekLabels: Record<
  (typeof daysPerWeekOptions)[number],
  string
> = {
  "1-2": "1–2 days",
  "3-4": "3–4 days",
  "5-plus": "5+ days",
};

export const yesNoUnsureLabels: Record<
  (typeof yesNoUnsureOptions)[number],
  string
> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};

export const referralLabels: Record<(typeof referralOptions)[number], string> = {
  google: "Google search",
  "social-media": "Social media",
  "friend-family": "Friend or family referral",
  "drive-by": "Drove or walked by",
  other: "Other",
};

export const intakeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  consultType: z.enum(consultTypeOptions, {
    message: "Please select a consultation type",
  }),
  bestTime: z.enum(bestTimeOptions, {
    message: "Please select a preferred time",
  }),
  interests: z
    .array(z.enum(interestOptions))
    .min(1, "Select at least one area of interest"),
  mainGoal: z
    .string()
    .min(1, "Please tell us your main goal")
    .max(500, "Please keep this under 500 characters"),
  exerciseHistory: z.enum(exerciseHistoryOptions, {
    message: "Please select your exercise background",
  }),
  injuries: z.string().max(500).optional(),
  daysPerWeek: z.enum(daysPerWeekOptions, {
    message: "Please select how often you can train",
  }),
  trainerBefore: z.enum(yesNoUnsureOptions, {
    message: "Please select an option",
  }),
  biggestObstacle: z.string().max(500).optional(),
  nutritionInterest: z.enum(yesNoUnsureOptions, {
    message: "Please select an option",
  }),
  referralSource: z.enum(referralOptions).optional(),
  additionalNotes: z.string().max(1000).optional(),
  website: z.string().max(0, "Invalid submission").optional(),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;

export type IntakePayload = IntakeFormData;
