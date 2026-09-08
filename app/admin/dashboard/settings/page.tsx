"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [username, setUsername] = useState("");
  const [orbitPasskey, setOrbitPasskey] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/credentials");
        const data = (await res.json()) as {
          ok?: boolean;
          username?: string;
          orbitPasskey?: string;
          error?: string;
        };
        if (!res.ok || !data.ok) {
          setError(data.error || "Failed to load credentials.");
        } else {
          setUsername(data.username || "");
          setOrbitPasskey(data.orbitPasskey || "");
        }
      } catch {
        setError("Network error.");
      }
      setLoading(false);
    })();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setToast("");
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, currentPassword, newPassword }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Update failed.");
        setSaving(false);
        return;
      }
      setToast(data.message || "Credentials updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Network error.");
    }
    setSaving(false);
  };

  const field =
    "h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Security
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">Login & Access</h1>
        <p className="mt-2 text-[14px] text-white/55">
          Change admin User ID / password. Orbit CMS passkey is also shown here.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="size-4 animate-spin" /> Loading…
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-[#F58220]">
              <KeyRound className="size-4" />
              <p className="text-[13px] font-bold">Orbit CMS passkey</p>
            </div>
            <p className="mt-2 font-mono text-[15px] text-white">{orbitPasskey || "—"}</p>
            <p className="mt-2 text-[12px] text-white/45">
              Use this passkey at <span className="text-white/70">/orbit</span>. Admin login also
              unlocks Orbit editors automatically.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                User ID
              </span>
              <input
                className={field}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Current password
              </span>
              <input
                type="password"
                className={field}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                New password
              </span>
              <input
                type="password"
                className={field}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Confirm new password
              </span>
              <input
                type="password"
                className={field}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {error ? (
              <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
                {error}
              </p>
            ) : null}
            {toast ? (
              <p className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-[13px] text-emerald-200">
                <CheckCircle2 className="size-4" />
                {toast}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#F58220] text-[13px] font-bold text-[#08121E] disabled:opacity-60"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              {saving ? "Saving…" : "Update login"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
