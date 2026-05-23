import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-brand text-black font-semibold shadow-[0_0_20px_rgba(159,204,62,0.2)] hover:bg-brand-hover hover:text-black hover:shadow-[0_0_28px_rgba(159,204,62,0.35)] focus-visible:ring-brand",
  outline:
    "border-2 border-brand bg-transparent text-brand hover:bg-brand/10 focus-visible:ring-brand",
  ghost: "text-white hover:bg-white/5 focus-visible:ring-brand",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-4 text-lg",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
