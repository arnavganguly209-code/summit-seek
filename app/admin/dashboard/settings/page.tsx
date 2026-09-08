"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";

export default function AdminSettingsPage() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappDisplay, setWhatsappDisplay] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingLogin, setSavingLogin] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [error, setError] = useState("");
  const [contactError, setContactError] = useState("");
  const [toast, setToast] = useState("");
  const [contactToast, setContactToast] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const [credRes, contactRes] = await Promise.all([
          fetch("/api/admin/credentials"),
          fetch("/api/admin/contact"),
        ]);
        const cred = (await credRes.json()) as {
          ok?: boolean;
          username?: string;
          error?: string;
        };
        const contact = (await contactRes.json()) as {
          ok?: boolean;
          email?: string;
          phone?: string;
          phoneDisplay?: string;
          whatsapp?: string;
          whatsappDisplay?: string;
          error?: string;
        };
        if (!credRes.ok || !cred.ok) {
          setError(cred.error || "Failed to load credentials.");
        } else {
          setUsername(cred.username || "");
        }
        if (contactRes.ok && contact.ok) {
          setEmail(contact.email || "");
          setPhone(contact.phone || "");
          setPhoneDisplay(contact.phoneDisplay || "");
          setWhatsapp(contact.whatsapp || "");
          setWhatsappDisplay(contact.whatsappDisplay || "");
        }
      } catch {
        setError("Network error.");
      }
      setLoading(false);
    })();
  }, []);

  const onSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setToast("");
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    setSavingLogin(true);
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, currentPassword, newPassword }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Update failed.");
        setSavingLogin(false);
        return;
      }
      setToast(data.message || "Credentials updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Network error.");
    }
    setSavingLogin(false);
  };

  const onSubmitContact = async (e: FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactToast("");
    setSavingContact(true);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          phoneDisplay: phoneDisplay || phone,
          whatsapp: whatsapp || phone,
          whatsappDisplay: whatsappDisplay || phoneDisplay || phone,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok || !data.ok) {
        setContactError(data.error || "Update failed.");
        setSavingContact(false);
        return;
      }
      setContactToast(data.message || "Contact details updated.");
    } catch {
      setContactError("Network error.");
    }
    setSavingContact(false);
  };

  const field =
    "h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-[13px] text-white outline-none focus:border-[#F58220]/50";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Settings
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">Login & Contact</h1>
        <p className="mt-2 text-[14px] text-white/55">
          Change admin User ID / password and public phone / email. Orbit passkey is not
          shown here.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="size-4 animate-spin" /> Loading…
        </div>
      ) : (
        <>
          <form
            onSubmit={onSubmitContact}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center gap-2 text-[#F58220]">
              <Phone className="size-4" />
              <p className="text-[13px] font-bold">Public contact details</p>
            </div>
            <p className="text-[12px] text-white/45">
              Updates header “Need Help? Call Us”, contact page, and related site contact fields.
            </p>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Email
              </span>
              <input
                type="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Phone (tel link)
              </span>
              <input
                className={field}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977-9823526833"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                Phone display
              </span>
              <input
                className={field}
                value={phoneDisplay}
                onChange={(e) => setPhoneDisplay(e.target.value)}
                placeholder="+977-9823526833"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                WhatsApp number
              </span>
              <input
                className={field}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+9779823526833"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                WhatsApp display
              </span>
              <input
                className={field}
                value={whatsappDisplay}
                onChange={(e) => setWhatsappDisplay(e.target.value)}
              />
            </label>
            {contactError ? (
              <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
                {contactError}
              </p>
            ) : null}
            {contactToast ? (
              <p className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-[13px] text-emerald-200">
                <CheckCircle2 className="size-4" />
                {contactToast}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={savingContact}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#F58220] text-[13px] font-bold text-[#08121E] disabled:opacity-60"
            >
              {savingContact ? <Loader2 className="size-4 animate-spin" /> : null}
              {savingContact ? "Saving…" : "Save contact details"}
            </button>
          </form>

          <form
            onSubmit={onSubmitLogin}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-[13px] font-bold text-white">Admin login</p>
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
              disabled={savingLogin}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#F58220] text-[13px] font-bold text-[#08121E] disabled:opacity-60"
            >
              {savingLogin ? <Loader2 className="size-4 animate-spin" /> : null}
              {savingLogin ? "Saving…" : "Update login"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
