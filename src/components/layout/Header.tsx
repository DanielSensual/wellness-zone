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
  { href: "#pillars", label: "Services" },
  { href: "#team", label: "Team" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={140}
            height={40}
            className="h-8 w-auto sm:h-10 brightness-0 invert"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <Button href="/get-started" size="sm">
            Free Consultation
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
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
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-ink-dark"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
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
