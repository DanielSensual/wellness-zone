import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { IntakeForm } from "./IntakeForm";

export const metadata: Metadata = {
  title: "Start Your Free Consultation",
  description:
    "Request your complimentary consultation at Wellness Zone in Winter Park, FL. Tell us your goals and we'll reach out to get started.",
};

export default function GetStartedPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface py-12 sm:py-16">
        <Container className="max-w-lg">
          <Link
            href="/"
            className="mb-6 inline-block text-sm text-ink hover:text-brand"
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold text-ink-dark sm:text-4xl">
            Start Your Free Consultation
          </h1>
          <p className="mt-3 text-ink">
            Tell us a bit about yourself and we&apos;ll reach out to schedule
            your complimentary consultation. No commitment required.
          </p>
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <IntakeForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
