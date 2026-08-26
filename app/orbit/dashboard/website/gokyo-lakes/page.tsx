import { GokyoLakesEditor } from "@/components/orbit/GokyoLakesEditor";
import { getGokyoLakesContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitGokyoLakesPage() {
  const content = await getGokyoLakesContent();
  return <GokyoLakesEditor initial={content} />;
}
