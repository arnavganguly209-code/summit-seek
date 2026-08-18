import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy short URL → Manaslu Region destination page */
export default function ManasluDestinationRedirect() {
  redirect("/destinations/manaslu-region");
}
