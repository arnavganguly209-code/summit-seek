import { SherpaniColEditor } from "@/components/orbit/SherpaniColEditor";
import { getSherpaniColContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitSherpaniColPage() {
  const content = await getSherpaniColContent();
  return <SherpaniColEditor initial={content} />;
}
