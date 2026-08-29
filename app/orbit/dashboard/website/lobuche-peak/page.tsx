import { LobuchePeakEditor } from "@/components/orbit/LobuchePeakEditor";
import { getLobuchePeakContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function OrbitLobuchePeakPage() {
  const content = await getLobuchePeakContent();
  return <LobuchePeakEditor initial={content} />;
}
