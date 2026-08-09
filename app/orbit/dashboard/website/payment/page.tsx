import { PaymentEditor } from "@/components/orbit/PaymentEditor";
import { getPaymentContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitPaymentPage() {
  const content = await getPaymentContent();
  return <PaymentEditor initial={content} />;
}
