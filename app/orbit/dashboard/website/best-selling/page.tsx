import { getBestSellingPackages } from "@/lib/orbit/store";
import { BestSellingPackagesEditor } from "@/components/orbit/BestSellingPackagesEditor";

export default async function OrbitBestSellingPage() {
  const content = await getBestSellingPackages();
  return <BestSellingPackagesEditor initial={content} />;
}
