"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Lock, Unlock, KeyRound, Mail, Loader2, AlertCircle } from "lucide-react";
import MemoryThankYouModal from "@/components/MemoryThankYouModal";

interface Story {
  id: string;
  author: string;
  relationship: string;
  message: string;
  date: string;
}

const initialStories: Story[] = [];

// Valid family passcodes (case-insensitive)
const VALID_PASSCODES = ["ladow", "azusa", "eagles", "11726", "11276", "rick", "family", "rick2026"];

export default function DigitalMemoryBook() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  
  const [author, setAuthor] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [lastAuthor, setLastAuthor] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    try {
      // 1. Check persistent unlocked state
      const unlockedState = localStorage.getItem("rick_memorial_unlocked");
      if (unlockedState === "true") {
        setIsUnlocked(true);
      }

      // 2. Check URL search parameters (Magic link support e.g. ?passcode=ladow or ?invite=family)
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("passcode") || params.get("invite") || params.get("key");
        if (code && VALID_PASSCODES.includes(code.toLowerCase().trim())) {
          setIsUnlocked(true);
          localStorage.setItem("rick_memorial_unlocked", "true");
        }
      }

      // 3. Load stored memories
      const saved = localStorage.getItem("rick_memorial_stories");
      if (saved) {
        setStories(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passcodeInput.toLowerCase().trim();
    if (VALID_PASSCODES.includes(cleanInput)) {
      setIsUnlocked(true);
      setPasscodeError(false);
      setPasscodeInput("");
      try {
        localStorage.setItem("rick_memorial_unlocked", "true");
      } catch {
        // ignore
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      localStorage.removeItem("rick_memorial_unlocked");
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || !author.trim() || !message.trim()) return;

    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "memory",
          name: author,
          relationship,
          message,
          website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
    } catch (err) {
      setSendError(
        `${err instanceof Error ? err.message : "Something went wrong."} Your message wasn't sent yet — please try again.`
      );
      setSending(false);
      return;
    }
    setSending(false);

    const newStory: Story = {
      id: Date.now().toString(),
      author: author.trim(),
      relationship: relationship.trim() || "Friend",
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    try {
      localStorage.setItem("rick_memorial_stories", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setLastAuthor(author.trim());
    setAuthor("");
    setRelationship("");
    setMessage("");
    setShowThankYouModal(true);
  };

  return (
    <section id="memories" className="scroll-mt-24">
      {/* Thank You Modal with Dog Animation */}
      <MemoryThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        authorName={lastAuthor}
      />

      <div className="bg-white rounded-lg border border-brand-200/90 shadow-warm p-6 sm:p-10">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-widest text-brand-700 uppercase font-sans">
            Memories &amp; Reflections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-950 mt-1.5">
            Digital Memory Book
          </h2>
          <div className="w-12 h-0.5 bg-brand-400 mx-auto my-3" />
          <p className="text-brand-700 text-sm sm:text-base font-serif italic">
            Share a memory, story, or message of comfort for Rick’s family.
          </p>
        </div>

        {/* Passcode Gate vs. Active Form */}
        {!isUnlocked ? (
          <div className="bg-brand-50/90 border border-brand-200 rounded-lg p-6 sm:p-8 mb-10 max-w-lg mx-auto text-center">
            <div className="w-12 h-12 bg-brand-100 text-brand-800 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
              <Lock className="w-5 h-5 text-brand-700" />
            </div>
            
            <h3 className="font-serif text-xl font-semibold text-brand-950 mb-1.5">
              Family &amp; Friends Passcode
            </h3>
            <p className="text-xs sm:text-sm text-brand-700 font-serif italic mb-5 leading-relaxed">
              To keep this space private and meaningful for Rick’s family, please enter the family passcode from your invitation or flyer to share a memory.
            </p>

            <form onSubmit={handleUnlock} className="space-y-3" noValidate={false}>
              <div className="flex gap-2 max-w-xs mx-auto">
                <div className="relative flex-1">
                  <label htmlFor="family-passcode" className="sr-only">
                    Family Passcode
                  </label>
                  <KeyRound className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  <input
                    id="family-passcode"
                    name="passcode"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={passcodeError}
                    aria-describedby={passcodeError ? "passcode-error-msg" : undefined}
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (passcodeError) setPasscodeError(false);
                    }}
                    placeholder="Enter passcode..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-brand-300 rounded text-sm text-brand-950 placeholder-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                >
                  Unlock
                </button>
              </div>

              {passcodeError && (
                <p id="passcode-error-msg" role="alert" className="text-xs text-red-700 font-medium">
                  Incorrect passcode. Please check your flyer or invitation (e.g. <em>LADOW</em>, <em>AZUSA</em>, <em>EAGLES</em>).
                </p>
              )}
            </form>

            <div className="mt-5 pt-4 border-t border-brand-200/70 text-xs text-brand-700 flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Need the code?</span>
              <a
                href="mailto:ricksmemorialtribute11726@gmail.com?subject=Passcode%20Request%20for%20Rick's%20Memory%20Book"
                className="underline hover:text-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 rounded px-1"
              >
                Contact the family
              </a>
            </div>
          </div>
        ) : (
          /* Unlocked Submission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-brand-50/70 border border-brand-200 rounded-lg p-5 sm:p-7 mb-10 max-w-2xl mx-auto relative"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-200/80">
              <div className="flex items-center gap-2 text-brand-900 font-serif font-semibold text-lg">
                <MessageSquare className="w-5 h-5 text-brand-700" aria-hidden="true" />
                <span>Leave a Thought or Story</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-800 bg-brand-200/70 px-2.5 py-1 rounded-full">
                  <Unlock className="w-3 h-3 text-brand-700" aria-hidden="true" />
                  Family Unlocked
                </span>
                <button
                  type="button"
                  onClick={handleLock}
                  className="text-[11px] text-brand-700 hover:text-brand-950 underline transition-colors rounded px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                  aria-label="Lock commenting on memory book"
                  title="Lock commenting"
                >
                  Lock
                </button>
              </div>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="memory-author-name" className="block text-xs font-semibold text-brand-800 uppercase tracking-wider mb-1">
                  Your Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="memory-author-name"
                  name="author"
                  autoComplete="name"
                  type="text"
                  required
                  aria-required="true"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Linda Smith"
                  className="w-full bg-white border border-brand-300 rounded px-3 py-2 text-sm text-brand-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="memory-author-relationship" className="block text-xs font-semibold text-brand-800 uppercase tracking-wider mb-1">
                  Relationship to Rick
                </label>
                <input
                  id="memory-author-relationship"
                  name="relationship"
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Lifelong Friend, Niece, Neighbor"
                  className="w-full bg-white border border-brand-300 rounded px-3 py-2 text-sm text-brand-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="memory-author-message" className="block text-xs font-semibold text-brand-800 uppercase tracking-wider mb-1">
                Your Memory or Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="memory-author-message"
                name="message"
                rows={3}
                required
                aria-required="true"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What made you smile when you think of Rick? A memory you'll always carry..."
                className="w-full bg-white border border-brand-300 rounded px-3 py-2 text-sm text-brand-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 transition-colors"
              />
            </div>

            {sendError && (
              <div role="alert" className="mb-3 p-3 bg-white border border-red-300 rounded text-xs text-brand-900">
                <AlertCircle className="w-4 h-4 text-red-600 inline mr-1.5" />
                {sendError}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
            >
              {sending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  Add to Memory Book
                </>
              )}
            </button>
          </form>
        )}

        {/* List of Stories or Empty State */}
        {stories.length === 0 ? (
          <div className="text-center py-10 px-4 bg-brand-50/40 rounded-lg border border-dashed border-brand-200/90 max-w-xl mx-auto">
            <MessageSquare className="w-5 h-5 text-brand-400 mx-auto mb-2" aria-hidden="true" />
            <p className="font-serif italic text-base sm:text-lg text-brand-900 mb-1">
              No memories shared yet.
            </p>
            <p className="text-xs sm:text-sm text-brand-700 font-sans">
              Be the first to share a favorite story, laugh, or message of comfort for Rick’s family.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {stories.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-md bg-brand-50/50 border border-brand-200/70 hover:border-brand-300 transition-colors flex flex-col justify-between"
              >
                <p className="text-brand-900 font-serif text-base leading-relaxed mb-4 italic">
                  “{s.message}”
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-brand-200/60 text-xs text-brand-700">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-brand-900">{s.author}</span>
                    <span className="text-brand-600">• {s.relationship}</span>
                  </div>
                  <span>{s.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
