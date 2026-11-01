"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface MemoryThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorName?: string;
}

export default function MemoryThankYouModal({
  isOpen,
  onClose,
  authorName,
}: MemoryThankYouModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-950/60 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="thank-you-title"
    >
      <div
        className="bg-white border border-brand-300 rounded-xl shadow-elevated p-6 sm:p-8 max-w-md w-full text-center relative transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          type="button"
          aria-label="Close thank you dialog"
          className="absolute top-4 right-4 text-brand-500 hover:text-brand-950 transition-colors p-1.5 rounded-full hover:bg-brand-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Animated Dog Illustration */}
        <div className="flex justify-center mb-5 relative" aria-hidden="true">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full drop-shadow-sm select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wagging Tail */}
              <g className="animate-tail-wag origin-[78px_85px]">
                <path
                  d="M78 85 C88 80, 96 68, 92 56 C88 52, 82 56, 80 62 C78 68, 76 78, 78 85 Z"
                  fill="#9A7B68"
                />
                <path
                  d="M92 56 C90 53, 85 55, 83 59"
                  stroke="#806555"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>

              {/* Dog Body */}
              <ellipse cx="60" cy="84" rx="26" ry="22" fill="#B09280" />
              <ellipse cx="60" cy="85" rx="19" ry="17" fill="#C7B0A2" />

              {/* Dog Paws */}
              <ellipse cx="48" cy="100" rx="9" ry="6" fill="#806555" />
              <ellipse cx="72" cy="100" rx="9" ry="6" fill="#806555" />
              <circle cx="45" cy="100" r="1.5" fill="#FAF8F6" />
              <circle cx="48" cy="101" r="1.5" fill="#FAF8F6" />
              <circle cx="51" cy="100" r="1.5" fill="#FAF8F6" />
              <circle cx="69" cy="100" r="1.5" fill="#FAF8F6" />
              <circle cx="72" cy="101" r="1.5" fill="#FAF8F6" />
              <circle cx="75" cy="100" r="1.5" fill="#FAF8F6" />

              {/* Collar & Pendant */}
              <rect x="42" y="65" width="36" height="5" rx="2.5" fill="#5C4B40" />
              <circle cx="60" cy="73" r="3.5" fill="#C7B0A2" stroke="#30251F" strokeWidth="1" />

              {/* Dog Head */}
              <circle cx="60" cy="46" r="23" fill="#B09280" />

              {/* Left Ear (Wiggles) */}
              <g className="animate-ear-wiggle origin-[42px_32px]">
                <path
                  d="M42 32 C35 32, 28 42, 30 56 C31 63, 37 64, 40 57 C43 51, 44 40, 42 32 Z"
                  fill="#806555"
                />
              </g>

              {/* Right Ear (Wiggles) */}
              <g className="animate-ear-wiggle origin-[78px_32px]">
                <path
                  d="M78 32 C85 32, 92 42, 90 56 C89 63, 83 64, 80 57 C77 51, 76 40, 78 32 Z"
                  fill="#806555"
                />
              </g>

              {/* Snout & Muzzle */}
              <ellipse cx="60" cy="53" rx="11" ry="8" fill="#FAF8F6" />
              <ellipse cx="60" cy="49" rx="4.5" ry="3.5" fill="#30251F" />
              <path
                d="M60 52.5 L60 56 M56 55 C58 57, 60 57, 60 57 C60 57, 62 57, 64 55"
                stroke="#30251F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Happy Blinking/Gentle Eyes */}
              <ellipse cx="50" cy="42" rx="3" ry="3.5" fill="#30251F" />
              <circle cx="49" cy="41" r="1.2" fill="#FFFFFF" />

              <ellipse cx="70" cy="42" rx="3" ry="3.5" fill="#30251F" />
              <circle cx="69" cy="41" r="1.2" fill="#FFFFFF" />

              {/* Subtle Blush */}
              <ellipse cx="44" cy="49" rx="3" ry="2" fill="#EBE2DD" opacity="0.8" />
              <ellipse cx="76" cy="49" rx="3" ry="2" fill="#EBE2DD" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3
          id="thank-you-title"
          className="font-serif text-2xl sm:text-3xl text-brand-950 font-normal tracking-tight mb-2"
        >
          Thank You for Sharing
        </h3>

        {/* Body Copy */}
        <p className="font-sans text-sm sm:text-base text-brand-800 leading-relaxed mb-6">
          {authorName ? (
            <>
              Thank you, <strong className="font-semibold text-brand-950">{authorName}</strong>.
              Your memory has been lovingly added to Rick’s digital tribute book.
            </>
          ) : (
            "Your memory has been lovingly added to Rick’s digital tribute book. Thank you for honoring his life with us."
          )}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full sm:w-auto px-8 py-2.5 bg-brand-900 text-brand-50 rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
