import Image from "next/image";
import { pillars } from "@/lib/content/pillars";
import { pricingNote as pricing } from "@/lib/content/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pillars() {
  return (
    <section id="pillars" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading
          title="The Three Pillars"
          subtitle="Three proven services to help you move, eat, and live well."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delayMs={index * 90}>
              <article className="h-full overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium uppercase tracking-wide text-ink">
                    {pillar.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink">
                    {pillar.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl bg-brand-pale/50 p-8 text-center">
            <h3 className="text-xl font-bold text-ink-dark">{pricing.title}</h3>
            <p className="mx-auto mt-4 max-w-3xl text-ink">{pricing.body}</p>
            <div className="mt-8">
              <CTAButton />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
