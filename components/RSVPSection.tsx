"use client";

import React, { useState } from "react";
import { Mail, Check, Copy, Send, ExternalLink, Loader2, AlertCircle } from "lucide-react";

export default function RSVPSection() {
  const rsvpEmail = "ricksmemorialtribute11726@gmail.com";
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [attendeeCount, setAttendeeCount] = useState("1");
  const [guestNote, setGuestNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(rsvpEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const subject = encodeURIComponent(`RSVP for Rick's Memorial - ${guestName || "Guest"}`);
  const body = encodeURIComponent(
    `Name(s): ${guestName || "[Your Name]"}\nAttendee Email: ${guestEmail || "[Your Email]"}\nNumber Attending: ${attendeeCount}\n\nNote for Family:\n${guestNote || "[Optional message]"}`
  );

  const mailtoLink = `mailto:${rsvpEmail}?subject=${subject}&body=${body}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${rsvpEmail}&su=${subject}&body=${body}`;
  const yahooWebLink = `https://compose.mail.yahoo.com/?to=${rsvpEmail}&subj=${subject}&body=${body}`;
  const outlookWebLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${rsvpEmail}&subject=${subject}&body=${body}`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "rsvp",
          name: guestName,
          email: guestEmail,
          count: attendeeCount,
          note: guestNote,
          website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const resetForm = () => {
    setGuestName("");
    setGuestEmail("");
    setAttendeeCount("1");
    setGuestNote("");
    setStatus("idle");
  };

  return (
    <section id="rsvp" className="scroll-mt-24">
      <div className="bg-brand-950 text-brand-50 rounded-lg p-6 sm:p-12 shadow-elevated border border-brand-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase font-sans">
            Please Let Us Know
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-50 mt-1 mb-2">
            RSVP for the Memorial
          </h2>
          <p className="text-brand-300 font-serif italic text-base sm:text-lg mb-8">
            Kindly RSVP by <strong className="text-brand-100 font-semibold">November 1, 2026</strong>{" "}
            if you plan on joining us.
          </p>

          {/* Quick Email Copy Box */}
          <div className="inline-flex items-center justify-between gap-3 bg-brand-900/90 border border-brand-700 px-4 py-3 rounded-md max-w-full mb-8">
            <div className="flex items-center gap-2 overflow-hidden text-left">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" aria-hidden="true" />
              <a
                href={mailtoLink}
                className="text-brand-100 font-sans font-medium text-xs sm:text-sm hover:underline truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-1"
              >
                {rsvpEmail}
              </a>
            </div>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="px-3 py-1 bg-brand-800 hover:bg-brand-700 text-brand-100 rounded text-xs flex items-center gap-1 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              aria-label="Copy RSVP email address"
              title="Copy Email Address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "RSVP email address copied to clipboard." : ""}
            </span>
          </div>

          {/* Direct RSVP Form */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-brand-900/60 border border-brand-800 rounded-lg p-6 sm:p-8 text-left backdrop-blur-sm"
          >
            <h3 className="font-serif text-lg text-brand-100 mb-1 font-semibold text-center">
              Send Your RSVP
            </h3>
            <p className="text-xs text-brand-400 text-center mb-6">
              Fill in your details below and we&apos;ll pass your RSVP along to the family
            </p>

            {status === "sent" ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-brand-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <p className="font-serif text-lg text-brand-100 mb-1">Thank you, {guestName.trim() || "friend"}.</p>
                <p className="text-sm text-brand-300 mb-5">Your RSVP has been sent to the family.</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-brand-300 hover:text-white underline transition-colors"
                >
                  Send another RSVP
                </button>
              </div>
            ) : (
            <div className="space-y-4">
              {/* Honeypot field for bots; hidden from people and screen readers */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="rsvp-guest-name" className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  Your Name(s) <span aria-hidden="true">*</span>
                </label>
                <input
                  id="rsvp-guest-name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  required
                  aria-required="true"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. John & Jane Doe"
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 placeholder-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="rsvp-guest-email" className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  Your Email Address
                </label>
                <input
                  id="rsvp-guest-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="e.g. yourname@example.com"
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 placeholder-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="rsvp-attendee-count" className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  Number of Attendees
                </label>
                <select
                  id="rsvp-attendee-count"
                  name="attendeeCount"
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(e.target.value)}
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 transition-colors"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>

              <div>
                <label htmlFor="rsvp-guest-note" className="block text-xs font-semibold text-brand-300 uppercase tracking-wider mb-1.5">
                  A Note for the Family (Optional)
                </label>
                <textarea
                  id="rsvp-guest-note"
                  name="note"
                  rows={3}
                  value={guestNote}
                  onChange={(e) => setGuestNote(e.target.value)}
                  placeholder="Share a thought, memory, or note of support..."
                  className="w-full bg-brand-950 border border-brand-700 rounded px-3.5 py-2.5 text-sm text-brand-100 placeholder-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 transition-colors"
                />
              </div>

              {/* Primary Send Button (sends directly to the family's inbox) */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full mt-2 py-3 bg-brand-100 text-brand-950 font-semibold rounded hover:bg-white transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send RSVP
                  </>
                )}
              </button>

              {status === "error" && (
                <div role="alert" className="p-3 bg-brand-950/80 border border-red-400/40 rounded text-center text-xs text-brand-200">
                  <AlertCircle className="w-4 h-4 text-red-300 inline mr-1.5" aria-hidden="true" />
                  {errorMessage} Please try again, or send it from your own email using the buttons below.
                </div>
              )}

              {/* Webmail Quick-Compose Options for users on Yahoo, Outlook, Gmail, etc. */}
              <div className="pt-4 border-t border-brand-800/80 text-center">
                <p className="text-[11px] text-brand-400 uppercase tracking-wider mb-2">
                  Prefer to send from your own email?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={yahooWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <span>Yahoo Mail</span>
                    <ExternalLink className="w-3 h-3 text-brand-400" aria-hidden="true" />
                    <span className="sr-only"> (opens Yahoo Mail in a new tab)</span>
                  </a>
                  <a
                    href={outlookWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <span>Outlook / Hotmail</span>
                    <ExternalLink className="w-3 h-3 text-brand-400" aria-hidden="true" />
                    <span className="sr-only"> (opens Outlook in a new tab)</span>
                  </a>
                  <a
                    href={gmailWebLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <span>Gmail</span>
                    <ExternalLink className="w-3 h-3 text-brand-400" aria-hidden="true" />
                    <span className="sr-only"> (opens Gmail in a new tab)</span>
                  </a>
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-950 border border-brand-700 rounded text-brand-200 hover:text-white hover:border-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    <span>Apple / Other App</span>
                    <ExternalLink className="w-3 h-3 text-brand-400" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
