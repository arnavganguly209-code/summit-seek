import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy short URL → Dolpo Region destination page */
export default function DolpoDestinationRedirect() {
  redirect("/destinations/dolpo-region");
}
