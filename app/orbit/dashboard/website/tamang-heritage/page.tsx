import { TamangHeritageEditor } from "@/components/orbit/TamangHeritageEditor";
import { getTamangHeritageContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitTamangHeritagePage() {
  const content = await getTamangHeritageContent();
  return <TamangHeritageEditor initial={content} />;
}
