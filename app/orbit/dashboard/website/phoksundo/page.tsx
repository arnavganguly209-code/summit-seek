import { PhoksundoEditor } from "@/components/orbit/PhoksundoEditor";
import { getPhoksundoContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPhoksundoPage() {
  const content = await getPhoksundoContent();
  return <PhoksundoEditor initial={content} />;
}
