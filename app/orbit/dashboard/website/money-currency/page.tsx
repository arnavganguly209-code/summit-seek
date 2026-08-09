import { MoneyCurrencyEditor } from "@/components/orbit/MoneyCurrencyEditor";
import { getMoneyCurrencyContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitMoneyCurrencyPage() {
  const content = await getMoneyCurrencyContent();
  return <MoneyCurrencyEditor initial={content} />;
}
