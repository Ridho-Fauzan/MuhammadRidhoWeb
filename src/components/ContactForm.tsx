"use client";

/**
 * Form "Kirim pesan".
 * - Pesan dikirim ke Formspree (ID di profile.ts -> formspreeId, atau env NEXT_PUBLIC_FORMSPREE_ID) lalu masuk ke email.
 * - Kalau ID kosong, form membuka aplikasi email pengunjung dengan isi pesan yang sudah terisi (mailto).
 */
import { CheckCircle2, Send, TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { useLang } from "@/i18n/useLang";
import { pressButton } from "./motion/press";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || profile.formspreeId;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "invalid" | "sending" | "sent" | "opened" | "error";

export default function ContactForm() {
  const { t } = useLang();
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (data.get("_gotcha")) return; // jebakan bot
    if (!name || !EMAIL_RE.test(email) || !message) return setStatus("invalid");

    if (!FORMSPREE_ID) {
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${f.subject} — ${name}`)}&body=${encodeURIComponent(body)}`;
      return setStatus("opened");
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        // `email` dipakai Formspree sebagai alamat Reply-To, jadi balasanmu langsung ke pengirim
        body: JSON.stringify({ name, email, message, _subject: `${f.subject} — ${name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full px-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted/60 border border-border outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]";

  const notice: Partial<Record<Status, { text: string; ok: boolean }>> = {
    invalid: { text: f.invalid, ok: false },
    error: { text: f.error, ok: false },
    sent: { text: f.sent, ok: true },
    opened: { text: f.opened, ok: true },
  };
  const msg = notice[status];

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="card relative text-left p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgb(var(--shadow-color)/0.35)]"
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{f.title}</h2>
        <span className="inline-flex items-center gap-2 text-xs text-muted">
          <span className="status-dot" aria-hidden /> {f.online}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="block mb-2 text-sm font-medium">{f.name}</span>
          <input name="name" autoComplete="name" required placeholder={f.namePh} className={field} />
        </label>
        <label className="block">
          <span className="block mb-2 text-sm font-medium">{f.email}</span>
          <input name="email" type="email" autoComplete="email" required placeholder={f.emailPh} className={field} />
        </label>
      </div>
      <label className="block mt-4">
        <span className="block mb-2 text-sm font-medium">{f.message}</span>
        <textarea name="message" required rows={5} placeholder={f.messagePh} className={`${field} resize-y min-h-28`} />
      </label>
      {/* honeypot anti-spam: disembunyikan dari manusia */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <motion.button
        {...pressButton}
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-6 w-full !h-12 disabled:opacity-70"
      >
        {status === "sending" ? f.sending : f.send} <Send className="w-4 h-4" />
      </motion.button>

      <AnimatePresence mode="wait">
        {msg && (
          <motion.p
            key={status}
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`mt-4 flex items-start gap-2 text-sm ${msg.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {msg.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" />}
            {msg.text}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
