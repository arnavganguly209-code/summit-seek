import { SheyGompaEditor } from "@/components/orbit/SheyGompaEditor";
import { getSheyGompaContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitSheyGompaPage() {
  const content = await getSheyGompaContent();
  return <SheyGompaEditor initial={content} />;
}
