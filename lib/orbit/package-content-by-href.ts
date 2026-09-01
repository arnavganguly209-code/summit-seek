import type { TrekPageContent } from "@/types/trek-page-cms";
import {
  HREF_ALIASES,
  LINKABLE_PACKAGE_OPTIONS,
  normalizePackageHref,
  type LinkablePackageOption,
} from "@/lib/orbit/package-hrefs";
import {
  getAnnapurnaBaseCampContent,
  getAnnapurnaBaseCampTrekContent,
  getAnnapurnaCircuitContent,
  getAnnapurnaCircuitTrekContent,
  getAnnapurnaLuxuryLodgeContent,
  getArunValleyContent,
  getBhaktapurCityContent,
  getEverestBaseCampContent,
  getEverestBaseCampHelicopterTourContent,
  getEverestBaseCampTrekContent,
  getEverestHeliViewContent,
  getEverestViewContent,
  getGokyoLakesContent,
  getGosainkundaContent,
  getHelambuContent,
  getJanakpurCityContent,
  getKanchenjungaBcContent,
  getKanchenjungaCircuitContent,
  getKanchenjungaNorthContent,
  getKanchenjungaSouthContent,
  getKathmanduCityContent,
  getLangtangValleyContent,
  getLangtangValleyTrekContent,
  getLobuchePeakContent,
  getLoManthangContent,
  getLowerDolpoContent,
  getLowerMustangContent,
  getLuxuryEverestBaseCampContent,
  getMakaluBarunContent,
  getMakaluBcContent,
  getManasluCircuitContent,
  getManasluCircuitTrekContent,
  getManasluTsumContent,
  getMardiHimalContent,
  getMeraPeakContent,
  getMustangHeliVipContent,
  getMustangJeepContent,
  getPhoksundoContent,
  getPokaldePeakContent,
  getPoonHillContent,
  getRupinaLaContent,
  getSherpaniColContent,
  getSheyGompaContent,
  getShivapuriYogaHikeContent,
  getTamangHeritageContent,
  getThreePassesContent,
  getTsumValleyContent,
  getUpperDolpoContent,
  getUpperMustangContent,
  getYalaPeakContent,
} from "@/lib/orbit/store";

export type LinkablePackage = LinkablePackageOption;

type Loader = () => Promise<TrekPageContent>;

const LOADERS: Record<string, Loader> = {
  "/packages/annapurna-base-camp-trek": getAnnapurnaBaseCampTrekContent,
  "/packages/annapurna-circuit-trek": getAnnapurnaCircuitTrekContent,
  "/packages/everest-base-camp-helicopter-tour": getEverestBaseCampHelicopterTourContent,
  "/packages/everest-base-camp-trek": getEverestBaseCampTrekContent,
  "/packages/langtang-valley-trek": getLangtangValleyTrekContent,
  "/packages/manaslu-circuit-trek": getManasluCircuitTrekContent,
  "/treks/annapurna-base-camp": getAnnapurnaBaseCampContent,
  "/treks/annapurna-circuit": getAnnapurnaCircuitContent,
  "/treks/annapurna-luxury-lodge": getAnnapurnaLuxuryLodgeContent,
  "/treks/arun-valley": getArunValleyContent,
  "/treks/everest-base-camp": getEverestBaseCampContent,
  "/treks/everest-heli-view": getEverestHeliViewContent,
  "/treks/everest-view": getEverestViewContent,
  "/treks/gokyo-lakes": getGokyoLakesContent,
  "/treks/gosainkunda": getGosainkundaContent,
  "/treks/helambu": getHelambuContent,
  "/treks/kanchenjunga-bc": getKanchenjungaBcContent,
  "/treks/kanchenjunga-circuit": getKanchenjungaCircuitContent,
  "/treks/kanchenjunga-north": getKanchenjungaNorthContent,
  "/treks/kanchenjunga-south": getKanchenjungaSouthContent,
  "/treks/langtang-valley": getLangtangValleyContent,
  "/treks/lobuche-peak": getLobuchePeakContent,
  "/treks/lo-manthang": getLoManthangContent,
  "/treks/lower-dolpo": getLowerDolpoContent,
  "/treks/lower-mustang": getLowerMustangContent,
  "/treks/luxury-everest-base-camp": getLuxuryEverestBaseCampContent,
  "/treks/makalu-barun": getMakaluBarunContent,
  "/treks/makalu-bc": getMakaluBcContent,
  "/treks/manaslu-circuit": getManasluCircuitContent,
  "/treks/manaslu-tsum": getManasluTsumContent,
  "/treks/mardi-himal": getMardiHimalContent,
  "/treks/mera-peak": getMeraPeakContent,
  "/treks/phoksundo": getPhoksundoContent,
  "/treks/pokalde-peak": getPokaldePeakContent,
  "/treks/poon-hill": getPoonHillContent,
  "/treks/rupina-la": getRupinaLaContent,
  "/treks/sherpani-col": getSherpaniColContent,
  "/treks/shey-gompa": getSheyGompaContent,
  "/treks/tamang-heritage": getTamangHeritageContent,
  "/treks/three-passes": getThreePassesContent,
  "/treks/tsum-valley": getTsumValleyContent,
  "/treks/upper-dolpo": getUpperDolpoContent,
  "/treks/upper-mustang": getUpperMustangContent,
  "/treks/yala-peak": getYalaPeakContent,
  "/tours/bhaktapur-city": getBhaktapurCityContent,
  "/tours/janakpur-city": getJanakpurCityContent,
  "/tours/kathmandu-city": getKathmanduCityContent,
  "/tours/mustang-heli-vip": getMustangHeliVipContent,
  "/tours/mustang-jeep": getMustangJeepContent,
  "/tours/shivapuri-yoga-hike": getShivapuriYogaHikeContent,
};

export const LINKABLE_PACKAGES: LinkablePackage[] = LINKABLE_PACKAGE_OPTIONS.filter(
  (option) => LOADERS[option.href],
);

export { HREF_ALIASES, normalizePackageHref };

export function parseDurationDays(label: string, fallback: number): number {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : fallback;
}

export async function getPackageContentByHref(
  href: string,
): Promise<TrekPageContent | null> {
  const normalized = normalizePackageHref(href);
  const loader = LOADERS[normalized];
  if (!loader) return null;
  return loader();
}

export async function loadPackageContentsForHrefs(
  hrefs: string[],
): Promise<Record<string, TrekPageContent>> {
  const normalized = [...new Set(hrefs.map((href) => normalizePackageHref(href)).filter(Boolean))];
  const entries = await Promise.all(
    normalized.map(async (href) => {
      const content = await getPackageContentByHref(href);
      return [href, content] as const;
    }),
  );

  const map: Record<string, TrekPageContent> = {};
  for (const [href, content] of entries) {
    if (content) map[href] = content;
  }
  return map;
}

export function resolvePackageSnapshot(
  href: string,
  content: TrekPageContent,
): {
  href: string;
  title: string;
  durationDays: number;
  price: number;
  compareAtPrice: number | null;
} {
  const normalized = normalizePackageHref(href);
  return {
    href: normalized,
    title: content.title,
    durationDays: parseDurationDays(content.durationLabel, 1),
    price: content.price,
    compareAtPrice: content.compareAtPrice ?? null,
  };
}
