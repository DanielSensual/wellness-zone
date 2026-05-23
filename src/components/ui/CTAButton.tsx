import { Button } from "./Button";
import { hero } from "@/lib/content/site";

export function CTAButton({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Button href={hero.ctaHref} size={size} className={className}>
      {hero.cta}
    </Button>
  );
}
