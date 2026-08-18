import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** Legacy short URL → Mustang Region destination page */
export default function MustangDestinationRedirect() {
  redirect("/destinations/mustang-region");
}
