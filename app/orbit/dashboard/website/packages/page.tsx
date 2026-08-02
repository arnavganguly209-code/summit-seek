import { getFeaturedPackages } from "@/lib/orbit/store";
import { FeaturedPackagesEditor } from "@/components/orbit/FeaturedPackagesEditor";

export default async function OrbitPackagesPage() {
  const content = await getFeaturedPackages();
  return <FeaturedPackagesEditor initial={content} />;
}
