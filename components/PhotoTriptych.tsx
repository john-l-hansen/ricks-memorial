"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface PhotoProps {
  src: string;
  alt: string;
  caption: string;
}

const photos: PhotoProps[] = [
  {
    src: "/images/rick-01.png",
    alt: "Rick (Richard Earl LaDow Jr.) outdoors with his trademark warm smile",
    caption: "Rick with his trademark warm smile",
  },
  {
    src: "/images/rick-02.png",
    alt: "Rick at home with his beloved companion dog",
    caption: "At home with his beloved companion",
  },
  {
    src: "/images/rick-03.png",
    alt: "Rick in a red shirt enjoying cherished moments with family and friends",
    caption: "Cherished moments with family and friends",
  },
];

export default function PhotoTriptych() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoProps | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Manage focus and Escape key when lightbox opens
  useEffect(() => {
    if (!selectedPhoto) return;

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [selectedPhoto]);

  const handleOpen = (photo: PhotoProps, e: React.MouseEvent<HTMLButtonElement>) => {
    lastActiveElement.current = e.currentTarget;
    setSelectedPhoto(photo);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
    setTimeout(() => {
      lastActiveElement.current?.focus();
    }, 50);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-8">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleOpen(photo, e)}
            aria-label={`Enlarge photo: ${photo.caption}`}
            className="group relative aspect-square overflow-hidden bg-brand-100 rounded-sm cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-brand-200/80 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/20 group-focus-visible:bg-brand-950/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 bg-brand-950/70 text-white p-2.5 rounded-full backdrop-blur-sm shadow-lg">
                <ZoomIn className="w-5 h-5" aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-caption"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              type="button"
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close enlarged photo"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </div>
            <p
              id="lightbox-caption"
              className="text-center py-3 text-brand-900 text-sm font-medium font-serif italic"
            >
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
