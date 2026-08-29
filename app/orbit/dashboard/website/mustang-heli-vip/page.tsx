import { MustangHeliVipEditor } from "@/components/orbit/MustangHeliVipEditor";
import { getMustangHeliVipContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMustangHeliVipPage() {
  const content = await getMustangHeliVipContent();
  return <MustangHeliVipEditor initial={content} />;
}
