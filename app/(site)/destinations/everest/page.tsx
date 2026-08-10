import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy short URL → Everest Region destination page */
export default function EverestDestinationRedirect() {
  redirect("/destinations/everest-region");
}
