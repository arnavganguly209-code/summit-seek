import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { redirect } from "next/navigation";
import { OrbitSidebar } from "@/components/orbit/OrbitSidebar";
import { OrbitLogoutButton } from "@/components/orbit/OrbitLogoutButton";

export default async function OrbitDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isOrbitAuthenticated())) {
    redirect("/orbit");
  }

  return (
    <div className="flex min-h-svh bg-[#0a101a] text-white">
      <OrbitSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-white/10 px-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Orbit CMS
            </p>
            <p className="text-[14px] font-semibold text-white">Summit Seek Control</p>
          </div>
          <OrbitLogoutButton />
        </header>
        <main className="flex-1 overflow-auto p-5 sm:p-7">{children}</main>
      </div>
    </div>
  );
}
