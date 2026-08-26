import { ManasluTsumEditor } from "@/components/orbit/ManasluTsumEditor";
import { getManasluTsumContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitManasluTsumPage() {
  const content = await getManasluTsumContent();
  return <ManasluTsumEditor initial={content} />;
}
