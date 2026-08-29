import { PokaldePeakEditor } from "@/components/orbit/PokaldePeakEditor";
import { getPokaldePeakContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPokaldePeakPage() {
  const content = await getPokaldePeakContent();
  return <PokaldePeakEditor initial={content} />;
}
