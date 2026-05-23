import { hero } from "@/lib/content/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";

export function CtaBanner() {
  return (
    <section className="border-t border-brand/10 bg-surface py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Transform Your Life?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground">
          {hero.subhead}
        </p>
        <div className="mt-8 shadow-[0_0_20px_rgba(159,204,62,0.3)]">
          <CTAButton size="lg" />
        </div>
      </Container>
    </section>
  );
}
