import Image from "next/image";
import Link from "next/link";
import { pillars } from "@/lib/content/pillars";
import { pricingNote as pricing } from "@/lib/content/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { cn } from "@/lib/utils/cn";

export function Pillars() {
  return (
    <section id="pillars" className="scroll-mt-20 bg-surface">
      <Container className="pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Our Approach"
          title="The Three Pillars"
          subtitle="Three proven services to help you move, eat, and live well."
        />
      </Container>

      <div className="space-y-0">
        {pillars.map((pillar, index) => {
          const reverse = index % 2 === 1;
          return (
            <Reveal key={pillar.id} delayMs={index * 80}>
              <article
                className={cn(
                  "flex flex-col items-stretch md:min-h-[560px]",
                  reverse ? "md:flex-row-reverse" : "md:flex-row",
                )}
              >
                <Tilt3D className="relative h-[300px] w-full md:h-auto md:w-1/2">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 hover:bg-black/30" aria-hidden />
                  <div
                    className={cn(
                      "absolute inset-y-0 w-px bg-brand/30",
                      reverse ? "left-0" : "right-0",
                    )}
                    aria-hidden
                  />
                </Tilt3D>

                <div className="glass-section flex w-full items-center px-6 py-12 md:w-1/2 md:px-12 lg:px-16">
                  <div className="max-w-xl">
                    <div
                      className="animate-float mb-5 h-1 w-[60px] rounded-full bg-brand shadow-[0_0_18px_rgba(159,204,62,0.6)]"
                      aria-hidden
                    />
                    <p className="text-glow text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                      Pillar 0{index + 1}
                    </p>
                    <h3 className="font-display text-shimmer mt-3 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-light">
                      {pillar.subtitle}
                    </p>
                    <p className="mt-6 leading-relaxed text-foreground">
                      {pillar.description}
                    </p>
                    <Link
                      href="/get-started"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand transition-colors duration-300 hover:text-brand-light"
                    >
                      Learn more
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Container className="pb-16 pt-16 sm:pb-24">
        <Reveal>
          <div className="glass-section rounded-2xl border-t-2 border-brand p-8 text-center sm:p-10">
            <h3 className="font-display text-3d-subtle text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              {pricing.title}
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-foreground">
              {pricing.body}
            </p>
            <div className="mt-8">
              <CTAButton />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
