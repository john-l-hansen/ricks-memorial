"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Calendar, MessageSquare, Mail } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 20);

      // Always show at the top of the page
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (delta > 8 && currentScrollY > 80) {
        // Scrolling down past header threshold: soft slide out of view
        setIsVisible(false);
      } else if (delta < -8) {
        // Scrolling up: soft-quick snap back into view
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transform will-change-transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:translate-y-0 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-brand-50/95 backdrop-blur-md shadow-sm border-b border-brand-200/80 py-3"
          : "bg-transparent py-5"
      }`}
      aria-label="Site header"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#"
          aria-label="Richard Earl LaDow Jr. Memorial - back to top of page"
          className="flex items-center gap-2 text-brand-900 hover:text-brand-700 transition-colors group rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
        >
          <Heart className="w-4 h-4 text-brand-600 fill-brand-200 group-hover:scale-110 transition-transform" aria-hidden="true" />
          <span className="font-sans text-[12px] font-semibold tracking-[0.25em] uppercase text-brand-950">
            Richard Earl LaDow Jr.
          </span>
        </a>

        <nav aria-label="Quick navigation" className="hidden md:flex items-center gap-6 text-xs text-brand-800">
          <a
            href="#details"
            className="hover:text-brand-950 transition-colors flex items-center gap-1.5 font-medium rounded py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
          >
            <Calendar className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
            Service Details
          </a>
          <a
            href="#memories"
            className="hover:text-brand-950 transition-colors flex items-center gap-1.5 font-medium rounded py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
            Share a Memory
          </a>
          <a
            href="#rsvp"
            className="px-4 py-2 bg-brand-900 text-brand-50 rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-950 transition-colors shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            RSVP
          </a>
        </nav>
      </div>
    </header>
  );
}
