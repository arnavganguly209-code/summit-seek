import { getHeroContent } from "@/lib/orbit/store";
import { HeaderLogosEditor } from "@/components/orbit/HeaderLogosEditor";

export default async function OrbitHeaderLogosPage() {
  const content = await getHeroContent();
  return <HeaderLogosEditor initial={content} />;
}
