import { ThreePassesEditor } from "@/components/orbit/ThreePassesEditor";
import { getThreePassesContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitThreePassesPage() {
  const content = await getThreePassesContent();
  return <ThreePassesEditor initial={content} />;
}
