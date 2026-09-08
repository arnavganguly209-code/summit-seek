import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import AdminLoginClient from "./AdminLoginClient";

export default async function AdminPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/dashboard");
  }
  return <AdminLoginClient />;
}
