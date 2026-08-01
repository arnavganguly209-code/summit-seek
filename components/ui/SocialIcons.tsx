import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function FacebookIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M23 12.2s0-3.4-.4-5c-.2-1-1-1.8-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.6.4c-1 .2-1.8 1-2 2C1 8.8 1 12.2 1 12.2s0 3.4.4 5c.2 1 1 1.8 2 2 1.8.4 8.6.4 8.6.4s6.8 0 8.6-.4c1-.2 1.8-1 2-2 .4-1.6.4-5 .4-5zM9.8 15.5v-6.6l5.8 3.3-5.8 3.3z" />
    </svg>
  );
}
