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
              <article className="glow-green-hover flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(159,204,62,0.15)] bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-brand/60">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/60" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="border-b-2 border-brand pb-2 text-xl font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand">
                    {pillar.subtitle}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    {pillar.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-brand/20 bg-surface-elevated p-8 text-center glow-green sm:p-10">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {pricing.title}
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-foreground">{pricing.body}</p>
            <div className="mt-8">
              <CTAButton />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
