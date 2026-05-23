import { contact } from "@/lib/content/contact";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { value: "26+", label: "Years" },
  { value: "5", label: "Expert Trainers" },
  { value: "5.0★", label: "Google Rating" },
  { value: "WPK", label: "Winter Park, FL" },
];

export function Location() {
  return (
    <section
      id="location"
      className="scroll-mt-20 bg-background py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Find Us"
          title="Visit Us"
          subtitle="Winter Park, Florida"
        />

        <div className="mb-12 overflow-hidden rounded-2xl glass-section">
          <ul className="grid grid-cols-2 divide-x divide-brand/10 sm:grid-cols-4">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col items-center justify-center px-4 py-6 text-center sm:py-8"
              >
                <span className="font-display text-3d-subtle text-3xl font-bold text-brand sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60 sm:text-sm">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <address className="space-y-4 not-italic">
              <p className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                {contact.address.full}
              </p>
              <p>
                <a
                  href={contact.phoneHref}
                  className="text-lg font-medium text-brand hover:underline"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={contact.emailHref}
                  className="font-medium text-brand hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </address>
            <CTAButton />
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-foreground transition-colors hover:text-brand"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand/20">
            <iframe
              title="Wellness Zone location map"
              src={contact.mapsEmbedUrl}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
