import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return (
    <div className="relative flex min-h-svh overflow-hidden bg-[#060a12] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(900px 420px at 10% -10%, rgba(245,130,32,0.16), transparent 55%), radial-gradient(700px 380px at 95% 0%, rgba(29,78,216,0.14), transparent 50%), linear-gradient(180deg, rgba(7,16,24,0.2), transparent)",
        }}
        aria-hidden
      />
      <AdminSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/[0.08] bg-black/25 px-5 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
              Premium Admin
            </p>
            <p className="text-[15px] font-semibold tracking-tight text-white">
              Summit Seek Dashboard
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            View live site
          </a>
        </header>
        <main className="flex-1 overflow-auto p-5 sm:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
