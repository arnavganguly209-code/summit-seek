import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function TikTokIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M19.6 7.4c-1.7-.1-3.1-.9-4.1-2.1V15a5.5 5.5 0 1 1-4.7-5.4v2.4a3.1 3.1 0 1 0 2.2 3V2.5h2.3c.2 1.8 1.4 3.4 3.1 4.2.7.3 1.5.5 2.3.5v2.2c-.4 0-.7 0-1.1-.1z" />
    </svg>
  );
}

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

export function LinkedInIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4C4.1 4 3.3 4.8 3.3 5.8S4.1 7.6 5.1 7.6 6.9 6.8 6.9 5.8 6.1 4 5.1 4zM20.3 20h-2.8v-5.6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s.1-8.6 0-9.5h2.8v1.5c.4-.6 1.1-1.5 2.8-1.5 2 0 3.5 1.3 3.5 4.2V20z" />
    </svg>
  );
}

export function TripadvisorIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M12.1 3.2c-.5 0-1 .1-1.5.2L8.4 1.5l-.6 2.3C4.8 4.8 2.5 7.4 2 10.5h2.2c.5-1.8 1.7-3.3 3.3-4.2l-.9 3.4c-.8.7-1.3 1.8-1.3 3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.2 0-.4-.1-.6.3.1.6.1.9.1.3 0 .6 0 .9-.1 0 .2-.1.4-.1.6 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.2-.5-2.3-1.3-3l-.9-3.4c1.6.9 2.8 2.4 3.3 4.2H22c-.5-3.1-2.8-5.7-5.8-6.7l-.6-2.3-2.2 1.9c-.5-.1-1-.2-1.5-.2zm-2.8 8.5c0 1.2-1 2.2-2.2 2.2S4.9 12.9 4.9 11.7s1-2.2 2.2-2.2 2.2 1 2.2 2.2zm9.5 0c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2 2.2 1 2.2 2.2z" />
    </svg>
  );
}
