import { MustangJeepEditor } from "@/components/orbit/MustangJeepEditor";
import { getMustangJeepContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMustangJeepPage() {
  const content = await getMustangJeepContent();
  return <MustangJeepEditor initial={content} />;
}
