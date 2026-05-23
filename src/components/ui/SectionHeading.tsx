import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
  gradient = true,
  shimmer = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  gradient?: boolean;
  shimmer?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-glow text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display mt-2 text-3d-subtle text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl",
          shimmer ? "text-shimmer" : gradient ? "text-gradient-brand" : "text-white",
          eyebrow && "mt-3",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 text-lg text-foreground",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
