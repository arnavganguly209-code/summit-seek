import { HelambuEditor } from "@/components/orbit/HelambuEditor";
import { getHelambuContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitHelambuPage() {
  const content = await getHelambuContent();
  return <HelambuEditor initial={content} />;
}
