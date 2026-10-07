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
import { FormCat } from "./PixelCritters";

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
    "w-full px-3 py-2.5 bg-background text-foreground placeholder:text-muted/60 border-2 border-border outline-none transition-colors focus:border-accent";

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
      className="relative text-left p-5 sm:p-7 bg-surface/95 border-2 border-foreground shadow-[6px_6px_0_var(--shadow)]"
    >
      <FormCat happy={status === "sent" || status === "opened"} className="right-20 sm:right-28" />
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="text-xl sm:text-2xl">{f.title}</h3>
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-muted">
          <span className="w-2 h-2 bg-[#7fd1ae] animate-blink" /> online
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="block mb-1.5 text-xs uppercase tracking-[0.15em] text-muted">{f.name}</span>
          <input name="name" autoComplete="name" required placeholder={f.namePh} className={field} />
        </label>
        <label className="block">
          <span className="block mb-1.5 text-xs uppercase tracking-[0.15em] text-muted">{f.email}</span>
          <input name="email" type="email" autoComplete="email" required placeholder={f.emailPh} className={field} />
        </label>
      </div>
      <label className="block mt-4">
        <span className="block mb-1.5 text-xs uppercase tracking-[0.15em] text-muted">{f.message}</span>
        <textarea name="message" required rows={5} placeholder={f.messagePh} className={`${field} resize-y min-h-28`} />
      </label>
      {/* honeypot anti-spam: disembunyikan dari manusia */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <motion.button
        {...pressButton}
        type="submit"
        disabled={status === "sending"}
        className="retro-btn mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-on-accent uppercase tracking-[0.15em] text-sm disabled:opacity-70"
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
            className={`mt-4 flex items-start gap-2 text-sm ${msg.ok ? "text-[#7fd1ae]" : "text-accent-2"}`}
          >
            {msg.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" />}
            {msg.text}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
