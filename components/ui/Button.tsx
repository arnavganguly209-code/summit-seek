import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "outlineLight";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-midnight hover:bg-gold-dark shadow-[0_10px_30px_rgba(201,168,76,0.28)] hover:shadow-[0_12px_34px_rgba(168,137,46,0.35)]",
  secondary:
    "bg-midnight text-snow hover:bg-midnight-soft",
  ghost:
    "bg-transparent text-midnight hover:bg-mist",
  outline:
    "border border-midnight/20 text-midnight hover:border-gold hover:text-gold-dark bg-transparent",
  outlineLight:
    "border border-snow/50 text-snow hover:border-gold hover:text-gold bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs tracking-[0.08em]",
  md: "h-11 px-6 text-sm tracking-[0.06em]",
  lg: "h-13 px-8 text-sm tracking-[0.08em] min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-bold uppercase transition-all duration-300 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    "disabled:pointer-events-none disabled:opacity-50",
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
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
