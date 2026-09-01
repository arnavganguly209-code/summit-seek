import { ChitwanWildlifeLodgeSafariEditor } from "@/components/orbit/ChitwanWildlifeLodgeSafariEditor";
import { getChitwanWildlifeLodgeSafariContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitChitwanWildlifeLodgeSafariPage() {
  const content = await getChitwanWildlifeLodgeSafariContent();
  return <ChitwanWildlifeLodgeSafariEditor initial={content} />;
}
