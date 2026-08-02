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
    <div className="relative flex min-h-svh overflow-hidden bg-[#060a12] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(900px 420px at 12% -10%, rgba(245,130,32,0.14), transparent 55%), radial-gradient(700px 380px at 90% 0%, rgba(29,78,216,0.12), transparent 50%)",
        }}
        aria-hidden
      />
      <OrbitSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/[0.08] bg-black/20 px-5 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
              Orbit CMS
            </p>
            <p className="text-[15px] font-semibold tracking-tight text-white">
              Summit Seek Control
            </p>
          </div>
          <OrbitLogoutButton />
        </header>
        <main className="flex-1 overflow-auto p-5 sm:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
