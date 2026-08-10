import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AnnapurnaDestinationRedirect() {
  redirect("/destinations/annapurna-region");
}
