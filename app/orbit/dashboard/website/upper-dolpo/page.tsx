import { UpperDolpoEditor } from "@/components/orbit/UpperDolpoEditor";
import { getUpperDolpoContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitUpperDolpoPage() {
  const content = await getUpperDolpoContent();
  return <UpperDolpoEditor initial={content} />;
}
