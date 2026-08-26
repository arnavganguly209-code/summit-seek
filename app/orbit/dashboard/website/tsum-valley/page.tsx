import { TsumValleyEditor } from "@/components/orbit/TsumValleyEditor";
import { getTsumValleyContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitTsumValleyPage() {
  const content = await getTsumValleyContent();
  return <TsumValleyEditor initial={content} />;
}
