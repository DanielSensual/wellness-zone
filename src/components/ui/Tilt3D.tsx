"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Glow intensity (0-1) */
  glowIntensity?: number;
  /** Scale on hover */
  scale?: number;
};

export function Tilt3D({
  children,
  className,
  maxTilt = 12,
  glowIntensity = 0.6,
  scale = 1.02,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      // Position glow at cursor
      const glowEl = el.querySelector<HTMLElement>("[data-glow]");
      if (glowEl) {
        glowEl.style.opacity = String(glowIntensity);
        glowEl.style.background = `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, var(--brand-glow), transparent 40%)`;
      }
    },
    [maxTilt, glowIntensity, scale],
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    const glowEl = el.querySelector<HTMLElement>("[data-glow]");
    if (glowEl) {
      glowEl.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "tilt-3d relative overflow-hidden transition-transform duration-200 ease-out will-change-transform",
        className,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {/* Dynamic glow overlay */}
      <div
        data-glow
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300"
        aria-hidden
      />
      {/* Edge highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-brand/0 transition-all duration-300 group-hover:border-brand/30"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}
        aria-hidden
      />
    </div>
  );
}
