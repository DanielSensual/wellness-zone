import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Head back home or start a free consultation with Wellness Zone.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface py-20 sm:py-28">
        <Container className="max-w-2xl text-center">
          <p className="text-7xl font-bold text-brand sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-bold text-ink-dark sm:text-4xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-4 text-lg text-ink">
            The page may have moved or never existed. Let&apos;s get you back on
            track.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/" size="lg">
              Back to Home
            </Button>
            <Button href="/get-started" variant="outline" size="lg">
              Start Free Consultation
            </Button>
          </div>
          <p className="mt-10 text-sm text-ink">
            Need help? Call{" "}
            <a href={contact.phoneHref} className="font-semibold text-brand hover:underline">
              {contact.phone}
            </a>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
