import { KoshiTappuSafariEditor } from "@/components/orbit/KoshiTappuSafariEditor";
import { getKoshiTappuSafariContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitKoshiTappuSafariPage() {
  const content = await getKoshiTappuSafariContent();
  return <KoshiTappuSafariEditor initial={content} />;
}
