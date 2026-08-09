import { WhySummitSeekEditor } from "@/components/orbit/WhySummitSeekEditor";
import { getWhySummitSeekContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitWhySummitSeekPage() {
  const content = await getWhySummitSeekContent();
  return <WhySummitSeekEditor initial={content} />;
}
