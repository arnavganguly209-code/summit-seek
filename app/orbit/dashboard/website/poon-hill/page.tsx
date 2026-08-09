import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import { getPoonHillContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPoonHillPage() {
  const content = await getPoonHillContent();
  return <PoonHillEditor initial={content} />;
}
