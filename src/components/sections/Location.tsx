import { contact } from "@/lib/content/contact";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Location() {
  return (
    <section id="location" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <Container>
        <SectionHeading title="Visit Us" subtitle="Winter Park, Florida" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <address className="space-y-4 not-italic">
              <p className="text-lg font-semibold text-white">
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
