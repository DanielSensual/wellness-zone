"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/lib/content/team";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { cn } from "@/lib/utils/cn";

type Props = {
  members: TeamMember[];
};

export function TeamScroller({ members }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const { scrollLeft, scrollWidth, clientWidth } = node;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    updateArrows();
    node.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      node.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (direction: "left" | "right") => {
    const node = scrollerRef.current;
    if (!node) return;
    const firstCard = node.querySelector<HTMLElement>("[data-team-card]");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;
    node.scrollBy({
      left: direction === "right" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByCard("left")}
        aria-label="Scroll left"
        className={cn(
          "absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand/30 bg-background/80 p-3 text-brand backdrop-blur transition-all duration-300 hover:border-brand hover:bg-brand/10 lg:flex",
          canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollByCard("right")}
        aria-label="Scroll right"
        className={cn(
          "absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-brand/30 bg-background/80 p-3 text-brand backdrop-blur transition-all duration-300 hover:border-brand hover:bg-brand/10 lg:flex",
          canScrollRight ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {members.map((member) => (
          <article
            key={member.name}
            data-team-card
            className="group flex w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-brand/40 sm:w-[340px]"
          >
            <Tilt3D className="relative aspect-[3/4] w-full overflow-hidden" maxTilt={8} glowIntensity={0.8}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 280px, 340px"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent"
                aria-hidden
              />
            </Tilt3D>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-glow text-xl font-bold uppercase tracking-tight text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground line-clamp-4">
                {member.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
