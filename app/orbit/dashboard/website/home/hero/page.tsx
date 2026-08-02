import { getHeroContent } from "@/lib/orbit/store";
import { HeroEditor } from "@/components/orbit/HeroEditor";

export default async function OrbitHeroPage() {
  const hero = await getHeroContent();
  return <HeroEditor initial={hero} />;
}
