import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#060a12] text-white lg:flex-row">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(900px 420px at 10% -10%, rgba(245,130,32,0.16), transparent 55%), radial-gradient(700px 380px at 95% 0%, rgba(29,78,216,0.14), transparent 50%), linear-gradient(180deg, rgba(7,16,24,0.2), transparent)",
        }}
        aria-hidden
      />
      <AdminSidebar />
      <div className="relative flex min-w-0 min-h-0 flex-1 flex-col">
        <AdminTopBar />
        <main className="flex-1 overflow-auto p-5 sm:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
