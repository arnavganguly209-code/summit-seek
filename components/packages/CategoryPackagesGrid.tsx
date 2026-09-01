import type { FeaturedPackage } from "@/types/featured-packages";
import { FeaturedPackageCard } from "@/components/packages/FeaturedPackageCard";

type Props = {
  packages: FeaturedPackage[];
  heading: string;
  description: string;
  eyebrow?: string;
  /** Number of columns on xl screens — default 4 */
  columns?: 3 | 4;
};

export function CategoryPackagesGrid({
  packages,
  heading,
  description,
  eyebrow = "Summit Seek",
  columns = 4,
}: Props) {
  const list = packages.filter((p) => p.visible !== false);
  const gridCols =
    columns === 3
      ? "xl:grid-cols-3"
      : "xl:grid-cols-4";

  return (
    <div className="min-h-[70vh] bg-[#f7f8fb]">
      <div className="border-b border-[#e8edf3] bg-white">
        <div className="mx-auto w-full max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <p className="font-[family-name:var(--font-ui)] text-[12px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-bold tracking-[-0.02em] text-[#0b1524] sm:text-[2.5rem]">
            {heading}
          </h1>
          <p className="mt-3 max-w-2xl font-[family-name:var(--font-ui)] text-[15px] leading-relaxed text-[#5a6577]">
            {description}
          </p>
        </div>
      </div>

      <section
        className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
        aria-label={`${heading} packages`}
      >
        <div
          className={`grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 ${gridCols}`}
        >
          {list.map((pkg) => (
            <FeaturedPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>
    </div>
  );
}
