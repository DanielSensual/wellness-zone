import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";

function FacebookIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.2 8.4V6.9c0-.7.5-.9.8-.9h2V2.6L14.2 2.6c-3.1 0-3.8 2.3-3.8 3.8v2H8v3.4h2.4V22h3.8V11.8h2.6l.4-3.4h-3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:text-brand"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:text-brand"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/get-started" className="text-white/80 hover:text-brand">
                Get Started
              </Link>
              <Link href="/#pillars" className="text-white/80 hover:text-brand">
                Services
              </Link>
              <Link href="/#team" className="text-white/80 hover:text-brand">
                Team
              </Link>
              <Link href="/privacy-policy" className="text-white/80 hover:text-brand">
                Privacy
              </Link>
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
