import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-ink-dark sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-lg text-ink">{subtitle}</p>
      ) : null}
    </div>
  );
}
