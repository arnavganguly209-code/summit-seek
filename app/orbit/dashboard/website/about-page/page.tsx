import { getAboutPageContent } from "@/lib/orbit/store";
import { AboutPageEditor } from "@/components/orbit/AboutPageEditor";

export default async function OrbitAboutCompanyPage() {
  const content = await getAboutPageContent();
  return <AboutPageEditor initial={content} />;
}
