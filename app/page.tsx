"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import PhotoTriptych from "@/components/PhotoTriptych";
import EventDetails from "@/components/EventDetails";
import RSVPSection from "@/components/RSVPSection";
import DigitalMemoryBook from "@/components/DigitalMemoryBook";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { Printer } from "lucide-react";

export default function MemorialPage() {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-between">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-brand-950 focus:text-brand-50 focus:font-semibold focus:text-xs focus:uppercase focus:tracking-wider focus:rounded-md focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-brand-400 transition-transform"
      >
        Skip to main content
      </a>
      <LoadingScreen />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-20 sm:pt-24 pb-16 px-3 sm:px-6 outline-none">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {/* Main Flyer Framed Card */}
          <div className="print-page bg-white border border-brand-300 shadow-warm rounded-sm sm:rounded-md p-6 sm:p-12 md:p-16 relative">
            {/* Elegant Inner Border matching the flyer */}
            <div className="absolute inset-2 sm:inset-3 border border-brand-200 pointer-events-none rounded-xs" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {/* Header */}
              <p className="font-serif italic text-lg sm:text-xl text-brand-700 tracking-wide mb-2">
                A Tribute to Rick
              </p>
              
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-brand-950 tracking-tight leading-tight mb-3">
                Richard Earl LaDow Jr.
              </h1>

              <p className="font-serif text-lg sm:text-2xl text-brand-800 tracking-wide mb-4">
                October 5, 1957 — June 8, 2026
              </p>

              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-brand-700 uppercase font-sans mb-8">
                HUSBAND — FATHER — PAPA — SON — BROTHER — UNCLE — FRIEND
              </p>

              {/* Photo Triptych */}
              <div className="my-6 sm:my-8">
                <PhotoTriptych />
              </div>

              {/* Central Quote */}
              <p className="font-serif italic text-xl sm:text-2xl text-brand-900 my-8">
                Truly, a loving brother to all.
              </p>

              {/* Story & Invitation Paragraphs */}
              <div className="space-y-5 text-brand-900 font-serif text-base sm:text-lg leading-relaxed text-center sm:text-justify max-w-xl mx-auto">
                <p>
                  Please join us for a private gathering to celebrate Rick, remember the life he
                  lived, and honor the love, laughter, friendship, and memories he left with each of
                  us.
                </p>
                <p>
                  We invite you to bring a favorite memory of Rick, written down or simply carried
                  in your heart. There will be a special place to leave your written memories for our
                  family to keep, and time to share stories together for those who would like to.
                </p>
              </div>

              {/* Service Details Section on Flyer */}
              <div className="my-10 pt-6 border-t border-brand-200/80 space-y-2">
                <p className="font-serif font-bold text-lg sm:text-xl text-brand-950">
                  Saturday, November 7, 2026
                </p>
                <p className="font-serif italic text-brand-800 text-base sm:text-lg">
                  11:00 a.m. — 3:00 p.m.
                </p>
                <div className="w-8 h-px bg-brand-400 mx-auto my-3" />
                <p className="font-serif font-bold text-base sm:text-lg text-brand-950">
                  Fraternal Order of Eagles — Azusa Aerie #2810
                </p>
                <p className="font-serif italic text-brand-800 text-sm sm:text-base">
                  1603 San Gabriel Canyon Road
                  <br />
                  Azusa, California 91702
                </p>
              </div>

              {/* RSVP Callout */}
              <div className="pt-4 pb-2">
                <p className="font-serif italic text-brand-700 text-sm sm:text-base mb-1">
                  Kindly RSVP by November 1, 2026 if you plan on joining us:
                </p>
                <a
                  href="mailto:ricksmemorialtribute11726@gmail.com?subject=RSVP%20for%20Rick's%20Memorial"
                  className="font-serif text-base sm:text-xl text-brand-950 underline hover:text-brand-700 transition-colors font-medium break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 rounded"
                >
                  ricksmemorialtribute11726@gmail.com
                </a>
              </div>

              {/* Print Flyer Utility Button */}
              <div className="mt-8 no-print flex justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  aria-label="Print or save memorial flyer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-800 hover:text-brand-950 bg-brand-100/80 hover:bg-brand-200 px-4 py-2 rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  Print / Save Memorial Flyer
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Gathering Details Card with Maps & Calendar */}
          <EventDetails />

          {/* Digital Memory Book */}
          <DigitalMemoryBook />

          {/* RSVP Form Section */}
          <RSVPSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
