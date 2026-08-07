import { getBlogContent } from "@/lib/orbit/store";
import { BlogEditor } from "@/components/orbit/BlogEditor";

export default async function OrbitBlogPage() {
  const content = await getBlogContent();
  return <BlogEditor initial={content} />;
}
