import { cookies } from "next/headers";
import { ORBIT_SESSION_COOKIE, ORBIT_SESSION_VALUE } from "@/lib/orbit/defaults";

export async function isOrbitAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ORBIT_SESSION_COOKIE)?.value === ORBIT_SESSION_VALUE;
}
