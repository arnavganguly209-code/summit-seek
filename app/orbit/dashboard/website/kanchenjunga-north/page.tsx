import { KanchenjungaNorthEditor } from "@/components/orbit/KanchenjungaNorthEditor";
import { getKanchenjungaNorthContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKanchenjungaNorthPage() {
  const content = await getKanchenjungaNorthContent();
  return <KanchenjungaNorthEditor initial={content} />;
}
