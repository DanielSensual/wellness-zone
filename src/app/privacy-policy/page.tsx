import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Wellness Zone personal training, nutrition coaching, and lifestyle coaching inquiries.",
};

const sections = [
  {
    title: "Information We Collect",
    body: [
      "We collect the information you choose to send through our consultation form, including your name, contact details, goals, preferred contact method, and any message you provide.",
      "We may also receive basic technical information from your browser, such as pages visited, device type, and general usage data used to keep the website reliable and useful.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use your information to respond to consultation requests, schedule appointments, answer questions, and provide personal training, nutrition coaching, and lifestyle coaching services.",
      "We do not sell personal information. We only share it with service providers when needed to operate the website, deliver email, process form submissions, or manage scheduling.",
    ],
  },
  {
    title: "Data Choices",
    body: [
      `You can ask us to update or delete your contact information by emailing ${contact.email}. We may retain limited records when required for business, legal, or security purposes.`,
      "You can disable cookies or similar browser storage in your browser settings, although some website functionality may not work as expected.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards to protect information submitted through the website.",
      "No website or email system is completely secure, so please avoid sending sensitive medical, financial, or account information through general contact forms.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-block text-sm text-foreground/70 transition-colors duration-300 hover:text-brand"
          >
            ← Back to home
          </Link>

          <div className="rounded-2xl border border-brand/20 bg-surface-elevated p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {site.name}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-foreground/60">Last updated: May 23, 2026</p>
            <p className="mt-6 leading-relaxed text-foreground">
              This privacy policy explains how Wellness Zone collects, uses,
              and protects information submitted through this website.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed text-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-xl font-bold text-white">Contact</h2>
                <address className="mt-3 space-y-2 not-italic text-foreground">
                  <p>{contact.address.full}</p>
                  <p>
                    <a href={contact.phoneHref} className="text-brand hover:underline">
                      {contact.phone}
                    </a>
                  </p>
                  <p>
                    <a href={contact.emailHref} className="text-brand hover:underline">
                      {contact.email}
                    </a>
                  </p>
                </address>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
