import { getTravelArticles } from "@/lib/orbit/store";
import { TravelArticlesEditor } from "@/components/orbit/TravelArticlesEditor";

export default async function OrbitTravelArticlesPage() {
  const content = await getTravelArticles();
  return <TravelArticlesEditor initial={content} />;
}
