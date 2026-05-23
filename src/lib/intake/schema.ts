import { z } from "zod";

export const interestOptions = ["moving", "eating", "living"] as const;
export const bestTimeOptions = ["morning", "afternoon", "evening"] as const;

export const intakeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  bestTime: z.enum(bestTimeOptions, {
    message: "Please select a preferred time",
  }),
  interests: z
    .array(z.enum(interestOptions))
    .min(1, "Select at least one area of interest"),
  website: z.string().max(0, "Invalid submission").optional(),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;

export type IntakePayload = IntakeFormData;
