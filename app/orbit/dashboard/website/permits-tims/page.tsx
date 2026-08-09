import { PermitsTimsEditor } from "@/components/orbit/PermitsTimsEditor";
import { getPermitsTimsContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPermitsTimsPage() {
  const content = await getPermitsTimsContent();
  return <PermitsTimsEditor initial={content} />;
}
