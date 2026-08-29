import { KanchenjungaSouthEditor } from "@/components/orbit/KanchenjungaSouthEditor";
import { getKanchenjungaSouthContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKanchenjungaSouthPage() {
  const content = await getKanchenjungaSouthContent();
  return <KanchenjungaSouthEditor initial={content} />;
}
