import { getAboutIntro } from "@/lib/orbit/store";
import { AboutIntroEditor } from "@/components/orbit/AboutIntroEditor";

export default async function OrbitAboutPage() {
  const content = await getAboutIntro();
  return <AboutIntroEditor initial={content} />;
}
