import { redirect } from "next/navigation";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import OrbitLoginPage from "./OrbitLoginClient";

export default async function OrbitPage() {
  if (await isOrbitAuthenticated()) {
    redirect("/orbit/dashboard");
  }
  return <OrbitLoginPage />;
}
