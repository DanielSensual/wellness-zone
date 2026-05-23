"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-background py-16">
      <Container className="max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-3xl text-brand">
          !
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-foreground">
          We hit an unexpected snag. Please try again, or reach out and we&apos;ll
          help personally.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-foreground/60">Reference: {error.digest}</p>
        ) : null}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-brand"
          >
            ← Back to {site.name}
          </Link>
        </div>
        <p className="mt-10 text-sm text-foreground">
          Or call us:{" "}
          <a href={contact.phoneHref} className="font-semibold text-brand hover:underline">
            {contact.phone}
          </a>
        </p>
      </Container>
    </main>
  );
}
