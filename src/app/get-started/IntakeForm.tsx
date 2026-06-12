"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  bestTimeOptions,
  consultTypeOptions,
  consultTypeLabels,
  daysPerWeekOptions,
  daysPerWeekLabels,
  exerciseHistoryOptions,
  exerciseHistoryLabels,
  intakeSchema,
  interestOptions,
  referralOptions,
  referralLabels,
  yesNoUnsureOptions,
  yesNoUnsureLabels,
  type IntakeFormData,
} from "@/lib/intake/schema";
import { pillarLabels } from "@/lib/content/pillars";
import { contact } from "@/lib/content/contact";
import { submitIntake, type IntakeActionState } from "./actions";
import { Button } from "@/components/ui/Button";

const initialState: IntakeActionState = {
  ok: false,
  message: "",
};

const bestTimeLabels: Record<(typeof bestTimeOptions)[number], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export function IntakeForm() {
  const [state, formAction] = useActionState(submitIntake, initialState);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      interests: [],
      website: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    const fields: (keyof IntakeFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "consultType",
      "bestTime",
      "mainGoal",
      "exerciseHistory",
      "injuries",
      "daysPerWeek",
      "trainerBefore",
      "biggestObstacle",
      "nutritionInterest",
      "referralSource",
      "additionalNotes",
      "website",
    ];

    for (const key of fields) {
      const value = data[key];
      if (typeof value === "string" && value) {
        formData.set(key, value);
      }
    }

    data.interests.forEach((interest) => formData.append("interests", interest));

    startTransition(() => {
      formAction(formData);
    });
  });

  if (state.ok && state.message) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl font-bold text-black">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-white">You&apos;re all set!</h2>
        <p className="mt-3 text-foreground">{state.message}</p>
        {state.calendlyUrl ? (
          <div className="mt-6 shadow-[0_0_20px_rgba(159,204,62,0.3)]">
            <Button href={state.calendlyUrl} size="lg">
              Book Your Consultation Now
            </Button>
          </div>
        ) : null}
        <p className="mt-6 text-sm text-foreground">
          Questions? Call{" "}
          <a href={contact.phoneHref} className="font-semibold text-brand">
            {contact.phone}
          </a>
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-foreground/70 hover:text-brand"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate>
      {!state.ok && state.message ? (
        <p
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <FormSection
        title="Contact information"
        description="How we can reach you to schedule your free consultation."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="First name"
            required
            error={errors.firstName?.message ?? state.fieldErrors?.firstName?.[0]}
          >
            <input
              id="firstName"
              {...register("firstName")}
              autoComplete="given-name"
              className={inputClass}
              placeholder="Jane"
            />
          </Field>
          <Field
            label="Last name"
            required
            error={errors.lastName?.message ?? state.fieldErrors?.lastName?.[0]}
          >
            <input
              id="lastName"
              {...register("lastName")}
              autoComplete="family-name"
              className={inputClass}
              placeholder="Smith"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Email"
            required
            error={errors.email?.message ?? state.fieldErrors?.email?.[0]}
          >
            <input
              id="email"
              type="email"
              {...register("email")}
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>
          <Field
            label="Phone"
            required
            error={errors.phone?.message ?? state.fieldErrors?.phone?.[0]}
          >
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              autoComplete="tel"
              className={inputClass}
              placeholder="(407) 555-0100"
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="Your goals"
        description="Help us understand what you want to achieve so we can prepare for your consultation."
      >
        <Field
          label="What is your main fitness goal?"
          required
          error={errors.mainGoal?.message ?? state.fieldErrors?.mainGoal?.[0]}
        >
          <textarea
            id="mainGoal"
            rows={3}
            {...register("mainGoal")}
            className={textareaClass}
            placeholder="e.g. Lose weight, build strength, recover from an injury, improve mobility..."
          />
        </Field>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-white">
            What are you most interested in? <span className="text-red-400">*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {interestOptions.map((value) => (
              <label
                key={value}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-brand/20 px-4 py-3 transition-all duration-300 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
              >
                <input
                  type="checkbox"
                  value={value}
                  {...register("interests")}
                  className="h-5 w-5 rounded accent-brand"
                />
                <span className="text-sm font-medium text-white">
                  {pillarLabels[value]}
                </span>
              </label>
            ))}
          </div>
          {(errors.interests?.message ?? state.fieldErrors?.interests?.[0]) && (
            <p className="mt-1 text-sm text-red-400">
              {errors.interests?.message ?? state.fieldErrors?.interests?.[0]}
            </p>
          )}
        </fieldset>

        <Field
          label="Interested in nutrition guidance?"
          required
          error={
            errors.nutritionInterest?.message ??
            state.fieldErrors?.nutritionInterest?.[0]
          }
        >
          <RadioGroup
            name="nutritionInterest"
            options={yesNoUnsureOptions}
            labels={yesNoUnsureLabels}
            register={register}
          />
        </Field>

        <Field
          label="What has been your biggest obstacle so far?"
          error={
            errors.biggestObstacle?.message ??
            state.fieldErrors?.biggestObstacle?.[0]
          }
        >
          <textarea
            id="biggestObstacle"
            rows={2}
            {...register("biggestObstacle")}
            className={textareaClass}
            placeholder="Time, motivation, injuries, not knowing where to start..."
          />
        </Field>
      </FormSection>

      <FormSection
        title="Training background"
        description="No wrong answers — this helps us meet you where you are."
      >
        <Field
          label="How long have you been exercising consistently?"
          required
          error={
            errors.exerciseHistory?.message ??
            state.fieldErrors?.exerciseHistory?.[0]
          }
        >
          <select id="exerciseHistory" {...register("exerciseHistory")} className={selectClass}>
            <option value="">Select one</option>
            {exerciseHistoryOptions.map((value) => (
              <option key={value} value={value}>
                {exerciseHistoryLabels[value]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="How many days per week can you realistically train?"
          required
          error={errors.daysPerWeek?.message ?? state.fieldErrors?.daysPerWeek?.[0]}
        >
          <RadioGroup
            name="daysPerWeek"
            options={daysPerWeekOptions}
            labels={daysPerWeekLabels}
            register={register}
          />
        </Field>

        <Field
          label="Have you worked with a personal trainer before?"
          required
          error={
            errors.trainerBefore?.message ?? state.fieldErrors?.trainerBefore?.[0]
          }
        >
          <RadioGroup
            name="trainerBefore"
            options={yesNoUnsureOptions}
            labels={yesNoUnsureLabels}
            register={register}
          />
        </Field>

        <Field
          label="Any injuries, pain, or physical limitations we should know about?"
          error={errors.injuries?.message ?? state.fieldErrors?.injuries?.[0]}
        >
          <textarea
            id="injuries"
            rows={2}
            {...register("injuries")}
            className={textareaClass}
            placeholder="Optional — share anything that affects how you move or train"
          />
        </Field>
      </FormSection>

      <FormSection
        title="Consultation preferences"
        description="We'll use this to schedule your free consultation."
      >
        <Field
          label="How would you like to consult?"
          required
          error={
            errors.consultType?.message ?? state.fieldErrors?.consultType?.[0]
          }
        >
          <RadioGroup
            name="consultType"
            options={consultTypeOptions}
            labels={consultTypeLabels}
            register={register}
            layout="stack"
          />
        </Field>

        <Field
          label="Best time to reach you"
          required
          error={errors.bestTime?.message ?? state.fieldErrors?.bestTime?.[0]}
        >
          <RadioGroup
            name="bestTime"
            options={bestTimeOptions}
            labels={bestTimeLabels}
            register={register}
          />
        </Field>

        <Field
          label="How did you hear about Wellness Zone?"
          error={
            errors.referralSource?.message ?? state.fieldErrors?.referralSource?.[0]
          }
        >
          <select id="referralSource" {...register("referralSource")} className={selectClass}>
            <option value="">Optional</option>
            {referralOptions.map((value) => (
              <option key={value} value={value}>
                {referralLabels[value]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Anything else we should know before we talk?"
          error={
            errors.additionalNotes?.message ??
            state.fieldErrors?.additionalNotes?.[0]
          }
        >
          <textarea
            id="additionalNotes"
            rows={3}
            {...register("additionalNotes")}
            className={textareaClass}
            placeholder="Optional — questions, schedule constraints, or anything on your mind"
          />
        </Field>
      </FormSection>

      <Button
        type="submit"
        size="lg"
        className="w-full shadow-[0_0_20px_rgba(159,204,62,0.3)]"
        disabled={pending}
      >
        {pending ? "Submitting…" : "Request Free Consultation"}
      </Button>

      <p className="text-center text-xs text-foreground/60">
        By submitting, you agree to be contacted about your consultation request.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-brand/20 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 min-h-12 transition-all duration-300";

const textareaClass =
  "w-full resize-y rounded-xl border border-brand/20 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all duration-300";

const selectClass =
  "w-full rounded-xl border border-brand/20 bg-[#141414] px-4 py-3 text-base text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 min-h-12 transition-all duration-300";

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-5 border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
      <div>
        <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-foreground/70">{description}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">
        {label}
        {required ? <span className="text-red-400"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

function RadioGroup<T extends string>({
  name,
  options,
  labels,
  register,
  layout = "inline",
}: {
  name: keyof IntakeFormData;
  options: readonly T[];
  labels: Record<T, string>;
  register: ReturnType<typeof useForm<IntakeFormData>>["register"];
  layout?: "inline" | "stack";
}) {
  return (
    <div
      className={
        layout === "stack"
          ? "space-y-3"
          : "flex flex-wrap gap-3"
      }
    >
      {options.map((value) => (
        <label
          key={value}
          className={
            layout === "stack"
              ? "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-brand/20 px-4 py-3 transition-all duration-300 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
              : "flex cursor-pointer items-center gap-2 rounded-full border border-brand/20 px-4 py-2 transition-all duration-300 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
          }
        >
          <input
            type="radio"
            value={value}
            {...register(name)}
            className="h-5 w-5 accent-brand"
          />
          <span className="text-sm text-foreground">{labels[value]}</span>
        </label>
      ))}
    </div>
  );
}
