import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-pale bg-ink-dark text-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xl font-bold">{site.name}</p>
            <p className="mt-2 text-sm text-white/80">{site.tagline}</p>
            <div className="mt-6">
              <CTAButton size="sm" />
            </div>
          </div>

          <div>
            <p className="font-semibold">Contact</p>
            <address className="mt-3 space-y-2 text-sm not-italic text-white/80">
              <p>{contact.address.full}</p>
              <p>
                <a href={contact.phoneHref} className="hover:text-brand">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={contact.emailHref} className="hover:text-brand">
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="font-semibold">Follow Us</p>
            <div className="mt-3 flex gap-4">
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-brand"
              >
                Facebook
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-brand"
              >
                Instagram
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/get-started" className="text-white/80 hover:text-brand">
                Get Started
              </Link>
              <a href="#pillars" className="text-white/80 hover:text-brand">
                Services
              </a>
              <a href="#team" className="text-white/80 hover:text-brand">
                Team
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {year} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
