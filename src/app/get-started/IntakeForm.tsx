"use client";

import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  bestTimeOptions,
  intakeSchema,
  interestOptions,
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
    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);
    formData.set("email", data.email);
    if (data.phone) formData.set("phone", data.phone);
    formData.set("bestTime", data.bestTime);
    data.interests.forEach((i) => formData.append("interests", i));
    formData.set("website", data.website ?? "");
    startTransition(() => {
      formAction(formData);
    });
  });

  if (state.ok && state.message) {
    return (
      <div className="rounded-2xl border border-brand-pale bg-brand-pale/30 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-ink-dark">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-ink-dark">You&apos;re all set!</h2>
        <p className="mt-3 text-ink">{state.message}</p>
        {state.calendlyUrl ? (
          <div className="mt-6">
            <Button href={state.calendlyUrl} size="lg">
              Book Your Consultation Now
            </Button>
          </div>
        ) : null}
        <p className="mt-6 text-sm text-ink">
          Questions? Call{" "}
          <a href={contact.phoneHref} className="font-semibold text-brand">
            {contact.phone}
          </a>
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-ink hover:text-brand">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {!state.ok && state.message ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" required error={errors.firstName?.message ?? state.fieldErrors?.firstName?.[0]}>
          <input
            id="firstName"
            {...register("firstName")}
            autoComplete="given-name"
            className={inputClass}
            placeholder="Jane"
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName?.message ?? state.fieldErrors?.lastName?.[0]}>
          <input
            id="lastName"
            {...register("lastName")}
            autoComplete="family-name"
            className={inputClass}
            placeholder="Smith"
          />
        </Field>
      </div>

      <Field label="Email" required error={errors.email?.message ?? state.fieldErrors?.email?.[0]}>
        <input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Phone" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          autoComplete="tel"
          className={inputClass}
          placeholder="(407) 555-0100"
        />
      </Field>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-dark">
          Best time to reach you <span className="text-red-600">*</span>
        </legend>
        <div className="flex flex-wrap gap-3">
          {bestTimeOptions.map((value) => (
            <label key={value} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value={value}
                {...register("bestTime")}
                className="h-5 w-5 accent-brand"
              />
              <span className="text-sm text-ink">{bestTimeLabels[value]}</span>
            </label>
          ))}
        </div>
        {(errors.bestTime?.message ?? state.fieldErrors?.bestTime?.[0]) && (
          <p className="mt-1 text-sm text-red-600">
            {errors.bestTime?.message ?? state.fieldErrors?.bestTime?.[0]}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-dark">
          Interested in <span className="text-red-600">*</span>
        </legend>
        <div className="space-y-3">
          {interestOptions.map((value) => (
            <label
              key={value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-brand-pale px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-pale/40"
            >
              <input
                type="checkbox"
                value={value}
                {...register("interests")}
                className="h-5 w-5 rounded accent-brand"
              />
              <span className="font-medium text-ink-dark">{pillarLabels[value]}</span>
            </label>
          ))}
        </div>
        {(errors.interests?.message ?? state.fieldErrors?.interests?.[0]) && (
          <p className="mt-1 text-sm text-red-600">
            {errors.interests?.message ?? state.fieldErrors?.interests?.[0]}
          </p>
        )}
      </fieldset>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Submitting…" : "Request Free Consultation"}
      </Button>

      <p className="text-center text-xs text-ink/70">
        By submitting, you agree to be contacted about your consultation request.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-brand-pale bg-white px-4 py-3 text-base text-ink-dark placeholder:text-ink/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 min-h-12";

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
      <label className="mb-2 block text-sm font-semibold text-ink-dark">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
