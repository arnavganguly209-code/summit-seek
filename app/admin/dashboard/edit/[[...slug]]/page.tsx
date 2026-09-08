import { renderAdminCms } from "@/lib/admin/render-cms";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function AdminCmsEditPage({ params }: Props) {
  const { slug } = await params;
  return renderAdminCms(slug || []);
}
