"use client";

/** Reliable CMS media preview — avoids next/image query-string / optimizer issues. */
export function OrbitMediaPreview({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-black/40 text-white/30 ${className || ""}`}>
        No image
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className || "h-full w-full object-cover"}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const el = e.currentTarget;
        el.style.opacity = "0.35";
        el.alt = `${alt} (failed to load)`;
      }}
    />
  );
}
