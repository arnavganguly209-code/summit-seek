import { ChitwanJungleSafariEditor } from "@/components/orbit/ChitwanJungleSafariEditor";
import { getChitwanJungleSafariContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitChitwanJungleSafariPage() {
  const content = await getChitwanJungleSafariContent();
  return <ChitwanJungleSafariEditor initial={content} />;
}
