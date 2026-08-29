import { MakaluBarunEditor } from "@/components/orbit/MakaluBarunEditor";
import { getMakaluBarunContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMakaluBarunPage() {
  const content = await getMakaluBarunContent();
  return <MakaluBarunEditor initial={content} />;
}
