import { team } from "@/lib/content/team";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamScroller } from "./TeamScroller";

export function Team() {
  return (
    <section id="team" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Coaches"
          title="Meet the Team"
          subtitle="Expert coaches dedicated to your whole-life performance."
        />
      </Container>

      <Container className="!max-w-7xl">
        <TeamScroller members={team} />
      </Container>

      <Container>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-foreground/50 lg:hidden">
          Swipe to explore →
        </p>
        <div className="mt-10 text-center">
          <CTAButton />
        </div>
      </Container>
    </section>
  );
}
