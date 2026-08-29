import { ArunValleyEditor } from "@/components/orbit/ArunValleyEditor";
import { getArunValleyContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitArunValleyPage() {
  const content = await getArunValleyContent();
  return <ArunValleyEditor initial={content} />;
}
