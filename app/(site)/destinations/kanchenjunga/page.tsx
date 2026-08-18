import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy short URL → Kanchenjunga Region destination page */
export default function KanchenjungaDestinationRedirect() {
  redirect("/destinations/kanchenjunga-region");
}
