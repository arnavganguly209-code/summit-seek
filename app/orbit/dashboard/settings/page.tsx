"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Loader2, Shield } from "lucide-react";

export default function OrbitSettingsPage() {
  const [username, setUsername] = useState("");
  const [passwordVisible, setPasswordVisible] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/credentials");
        const data = (await res.json()) as {
          ok?: boolean;
          username?: string;
          password?: string;
          error?: string;
        };
        if (!res.ok || !data.ok) {
          setError(data.error || "Failed to load admin credentials.");
        } else {
          setUsername(data.username || "");
          setPasswordVisible(data.password || "");
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
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
        username?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Update failed.");
        setSaving(false);
        return;
      }
      setToast(data.message || "Admin login updated.");
      setUsername(data.username || username);
      setPasswordVisible(newPassword);
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
          Orbit Settings
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">Admin Login Access</h1>
        <p className="mt-2 text-[14px] text-white/55">
          View and change the <span className="text-white/80">/admin</span> User ID and
          password from Orbit. Orbit passkey stays separate (server env).
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
              <Shield className="size-4" />
              <p className="text-[13px] font-bold">Current /admin credentials</p>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  User ID
                </p>
                <p className="mt-1 font-mono text-[16px] text-white">{username || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Password
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <p className="font-mono text-[16px] text-white">
                    {showPassword ? passwordVisible || "—" : "••••••••••••"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="rounded-lg border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:bg-white/5"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center gap-2 text-[#F58220]">
              <KeyRound className="size-4" />
              <p className="text-[13px] font-bold">Change Admin User ID / password</p>
            </div>

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
              {saving ? "Saving…" : "Update admin login"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
