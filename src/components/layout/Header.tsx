"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/#pillars", label: "Services" },
  { href: "/#team", label: "Team" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#location", label: "Location" },
];

type HeaderProps = {
  transparent?: boolean;
};

export function Header({ transparent = false }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "left-0 right-0 top-0 z-50",
        transparent
          ? "absolute"
          : "relative border-b border-brand-pale bg-white shadow-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={40}
            height={40}
            className={cn(
              "h-8 w-8 sm:h-10 sm:w-10",
              transparent ? "brightness-0 invert" : "",
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand",
                transparent ? "text-white" : "text-ink-dark",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/get-started" size="sm">
            Free Consultation
          </Button>
        </nav>

        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-md p-2 md:hidden",
            transparent ? "text-white" : "text-ink-dark",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-brand-pale/60 bg-white md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-ink-dark"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/get-started" className="w-full">
            Free Consultation
          </Button>
          <a
            href={contact.phoneHref}
            className="text-sm text-ink"
          >
            {contact.phone}
          </a>
        </Container>
      </div>
    </header>
  );
}
