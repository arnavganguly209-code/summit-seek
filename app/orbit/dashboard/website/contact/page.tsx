import { getContactContent } from "@/lib/orbit/store";
import { ContactEditor } from "@/components/orbit/ContactEditor";

export default async function OrbitContactPage() {
  const content = await getContactContent();
  return <ContactEditor initial={content} />;
}
