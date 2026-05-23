import Image from "next/image";
import { team } from "@/lib/content/team";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Team() {
  return (
    <section id="team" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading title="Meet the Team" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delayMs={index * 75}>
              <article className="flex h-full flex-col rounded-2xl border border-brand-pale bg-white p-6 shadow-sm">
                <div className="mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-center text-xl font-bold text-ink-dark">
                  {member.name}
                </h3>
                <p className="text-center text-sm font-medium text-brand">
                  {member.role}
                </p>
                <details className="mt-4 group">
                  <summary className="cursor-pointer text-sm font-semibold text-ink-dark marker:content-none list-none [&::-webkit-details-marker]:hidden">
                    <span className="underline decoration-brand underline-offset-2 group-open:hidden">
                      Read bio
                    </span>
                    <span className="hidden underline decoration-brand underline-offset-2 group-open:inline">
                      Hide bio
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {member.bio}
                  </p>
                </details>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </Container>
    </section>
  );
}
