import { contact } from "@/lib/content/contact";
import { IntakeForm } from "@/app/get-started/IntakeForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ClientIntake() {
  return (
    <section
      id="intake"
      className="scroll-mt-20 border-t border-brand/10 bg-[#050505] py-20 sm:py-28"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Get Started"
          title="Book Your Free Consultation"
          subtitle="Answer a few quick questions about your goals so our coaches can prepare for your call. We'll reach out within one business day."
        />

        <div className="rounded-2xl glass-card p-6 sm:p-10">
          <IntakeForm />
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          Prefer to talk now? Call{" "}
          <a
            href={contact.phoneHref}
            className="font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            {contact.phone}
          </a>
        </p>
      </Container>
    </section>
  );
}
