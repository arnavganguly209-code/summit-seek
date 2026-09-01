import { BardiyaJungleSafariEditor } from "@/components/orbit/BardiyaJungleSafariEditor";
import { getBardiyaJungleSafariContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitBardiyaJungleSafariPage() {
  const content = await getBardiyaJungleSafariContent();
  return <BardiyaJungleSafariEditor initial={content} />;
}
