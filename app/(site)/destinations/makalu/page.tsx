import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy short URL → Makalu Region destination page */
export default function MakaluDestinationRedirect() {
  redirect("/destinations/makalu-region");
}
