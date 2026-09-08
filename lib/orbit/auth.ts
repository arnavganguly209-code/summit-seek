import { cookies } from "next/headers";
import { ORBIT_SESSION_COOKIE, ORBIT_SESSION_VALUE } from "@/lib/orbit/defaults";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
} from "@/lib/admin/auth";

/** Orbit editors/APIs accept either Orbit passkey session or Admin login. */
export async function isOrbitAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  if (jar.get(ORBIT_SESSION_COOKIE)?.value === ORBIT_SESSION_VALUE) return true;
  if (jar.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE) return true;
  return false;
}
