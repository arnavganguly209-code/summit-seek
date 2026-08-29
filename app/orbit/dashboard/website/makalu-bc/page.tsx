import { MakaluBcEditor } from "@/components/orbit/MakaluBcEditor";
import { getMakaluBcContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMakaluBcPage() {
  const content = await getMakaluBcContent();
  return <MakaluBcEditor initial={content} />;
}
