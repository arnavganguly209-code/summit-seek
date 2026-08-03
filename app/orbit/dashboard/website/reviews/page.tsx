import { getTravelerReviews } from "@/lib/orbit/store";
import { TravelerReviewsEditor } from "@/components/orbit/TravelerReviewsEditor";

export default async function OrbitReviewsPage() {
  const content = await getTravelerReviews();
  return <TravelerReviewsEditor initial={content} />;
}
