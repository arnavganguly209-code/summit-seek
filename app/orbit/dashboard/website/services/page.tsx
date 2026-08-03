import { getWhatWeOffer } from "@/lib/orbit/store";
import { WhatWeOfferEditor } from "@/components/orbit/WhatWeOfferEditor";

export default async function OrbitWhatWeOfferPage() {
  const content = await getWhatWeOffer();
  return <WhatWeOfferEditor initial={content} />;
}
