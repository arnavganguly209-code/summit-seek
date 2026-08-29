import { KanchenjungaBcEditor } from "@/components/orbit/KanchenjungaBcEditor";
import { getKanchenjungaBcContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKanchenjungaBcPage() {
  const content = await getKanchenjungaBcContent();
  return <KanchenjungaBcEditor initial={content} />;
}
