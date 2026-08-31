"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { submitRsvp } from "@/lib/rsvp";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

type Attending = "yes" | "no" | null;
type Status = "idle" | "sending" | "success" | "error";

const MAX_GUESTS = 10;

export function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>(null);
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const attendingYes = attending === "yes";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Lütfen adınızı ve soyadınızı yazın.");
      return;
    }
    if (!attending) {
      setError("Lütfen katılım durumunuzu seçin.");
      return;
    }
    // Bot tuzağı doldurulduysa sessizce başarılı gibi davran
    if (honeypot) {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      await submitRsvp({
        name: name.trim(),
        attending: attendingYes,
        guests: attendingYes ? guests : 0,
        note: note.trim(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Cevabınız gönderilemedi. Lütfen tekrar deneyin.",
      );
    }
  }

  return (
    <section className="relative bg-parchment px-6 pb-20 sm:pb-24" id="katilim">
      <SectionLabel>Katılım Bildirimi</SectionLabel>

      <Reveal delay={0.1} className="mx-auto mt-10 w-full max-w-[34rem]">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <ThankYou key="thanks" attending={attendingYes} />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="card px-6 py-8 sm:px-9 sm:py-10"
              exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-7 text-center text-[1rem] leading-relaxed text-muted italic">
                Hazırlıklarımızı size göre yapabilmemiz için katılım durumunuzu
                bildirmeniz bizi çok mutlu eder.
              </p>

              {/* Ad Soyad */}
              <label htmlFor="rsvp-name" className="label-caps mb-2.5 block text-muted">
                Ad Soyad
              </label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="field"
                required
              />

              {/* Bot tuzağı — ekranda görünmez */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              {/* Katılım durumu */}
              <p className="label-caps mt-7 mb-3 text-muted">Katılım Durumu</p>
              <div className="flex gap-3" role="radiogroup" aria-label="Katılım durumu">
                <ChoiceButton
                  selected={attending === "yes"}
                  tone="gold"
                  onClick={() => setAttending("yes")}
                >
                  Katılacağım
                </ChoiceButton>
                <ChoiceButton
                  selected={attending === "no"}
                  tone="blush"
                  onClick={() => setAttending("no")}
                >
                  Katılamayacağım
                </ChoiceButton>
              </div>

              {/* Kişi sayısı — yalnızca katılım varsa */}
              <AnimatePresence initial={false}>
                {attendingYes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="label-caps mt-7 mb-3 text-muted">Kişi Sayısı</p>
                    <div className="flex items-center gap-5">
                      <StepperButton
                        label="Bir kişi azalt"
                        disabled={guests <= 1}
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      >
                        &minus;
                      </StepperButton>

                      <span
                        className="tabular min-w-9 text-center font-display text-2xl text-ink"
                        aria-live="polite"
                      >
                        {guests}
                      </span>

                      <StepperButton
                        label="Bir kişi artır"
                        disabled={guests >= MAX_GUESTS}
                        onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                      >
                        +
                      </StepperButton>

                      <span className="ml-1 text-[0.95rem] text-muted italic">
                        kişi katılacak
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Not */}
              <label htmlFor="rsvp-note" className="label-caps mt-7 mb-2.5 block text-muted">
                Not <span className="normal-case opacity-70">(opsiyonel)</span>
              </label>
              <textarea
                id="rsvp-note"
                name="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="İletmek istediğiniz bir not var mı?"
                className="field resize-none"
              />

              {/* Hata mesajı */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="mt-5 rounded-xl border border-blush/70 bg-blush/15 px-4 py-3 text-center text-[0.95rem] text-ink-soft"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold mt-8 w-full py-4 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <motion.span
                      className="block h-3 w-3 rounded-full border border-current border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                    Gönderiliyor
                  </>
                ) : (
                  "Gönder"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

/* --- Yardımcı bileşenler -------------------------------------------------- */

function ChoiceButton({
  selected,
  tone,
  onClick,
  children,
}: {
  selected: boolean;
  tone: "gold" | "blush";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base =
    "flex-1 rounded-full px-3 py-3.5 font-label text-[0.66rem] uppercase tracking-[0.14em] transition-all duration-300";
  const selectedCls =
    tone === "gold"
      ? "border border-gold bg-linear-to-br from-gold-light via-gold to-gold-deep text-surface shadow-[var(--shadow-gold)]"
      : "border border-blush bg-blush text-ink shadow-[0_10px_22px_-12px_rgba(216,185,178,0.9)]";
  const idleCls =
    "border border-gold/35 bg-parchment/60 text-muted hover:border-gold/70 hover:text-ink-soft";

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`${base} ${selected ? selectedCls : idleCls}`}
    >
      {children}
    </button>
  );
}

function StepperButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 bg-parchment/60 text-lg text-ink transition-all duration-300 hover:border-gold hover:bg-gold-pale disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gold/45 disabled:hover:bg-parchment/60"
    >
      {children}
    </button>
  );
}

/** Gönderim sonrası teşekkür kartı — çizilen onay işareti ile. */
function ThankYou({ attending }: { attending: boolean }) {
  return (
    <motion.div
      className="card px-6 py-12 text-center sm:px-10"
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold-pale/50"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8 text-gold-deep" fill="none" aria-hidden="true">
          <motion.path
            d="M9 16.5 L14 21.5 L23.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.span>

      <p className="font-display text-[1.9rem] leading-tight text-ink italic">
        Teşekkür Ederiz
      </p>
      <p className="mx-auto mt-3 max-w-[22rem] text-[1.02rem] leading-relaxed text-muted">
        {attending
          ? "Cevabınız bize ulaştı. Sizi ağırlamayı sabırsızlıkla bekliyoruz."
          : "Cevabınız bize ulaştı. Sizi aramızda göremeyeceğimiz için üzgünüz, iyi dileklerinizi hissediyoruz."}
      </p>
    </motion.div>
  );
}
