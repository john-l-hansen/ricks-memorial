"use client";

import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoading(false);
      return;
    }

    // Smooth progress progression
    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds for an elegant, non-intrusive feel

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculatedProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setFading(true);
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 700); // Wait for fade-out duration
        return () => clearTimeout(timeout);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-50 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={loading}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-sm mx-auto">
        {/* Name Header */}
        <h2 className="font-serif text-2xl sm:text-3xl text-brand-950 font-normal tracking-wide mb-6">
          Richard Earl LaDow Jr.
        </h2>

        {/* Delicate Loading Bar */}
        <div className="w-52 sm:w-60 h-[2px] bg-brand-200/90 rounded-full overflow-hidden mb-4 relative">
          <div
            className="h-full bg-brand-800 rounded-full transition-all duration-150 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Subtle light shimmer along the bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-400/50 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Status Message */}
        <p className="font-sans text-xs sm:text-sm text-brand-700 font-normal tracking-wide animate-pulse">
          Loading... one moment.
        </p>
      </div>
    </div>
  );
}
