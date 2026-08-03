import { getFooterContent } from "@/lib/orbit/store";
import { FooterEditor } from "@/components/orbit/FooterEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getFooterContent();
  return <FooterEditor initial={content} />;
}
