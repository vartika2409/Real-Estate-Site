"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Grid2x2, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { PropertyImage } from "@/types";

interface ImageGalleryProps {
  images: PropertyImage[];
  title: string;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

function imgUrl(img: PropertyImage | undefined): string {
  return img?.url || PLACEHOLDER;
}
function imgAlt(img: PropertyImage | undefined, fallback: string): string {
  return img?.alt || fallback;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const safeImages = images?.length ? images : [{ url: PLACEHOLDER, alt: title }];
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  function openLightbox(index: number) {
    setLightbox(index);
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function navigate(dir: number) {
    if (lightbox === null) return;
    setDirection(dir);
    setLightbox((prev) => {
      if (prev === null) return null;
      return (prev + dir + safeImages.length) % safeImages.length;
    });
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden h-72 sm:h-96">
        <div
          className="col-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={imgUrl(safeImages[0])}
            alt={imgAlt(safeImages[0], title)}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 66vw, 50vw"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
            <ZoomIn className="h-8 w-8 text-white drop-shadow" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {safeImages.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="relative flex-1 cursor-pointer group"
              onClick={() => openLightbox(i + 1)}
            >
              <Image
                src={imgUrl(img)}
                alt={imgAlt(img, title)}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
              {i === 1 && safeImages.length > 3 && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
                >
                  <span className="flex items-center gap-1 text-white font-semibold text-sm">
                    <Grid2x2 className="h-4 w-4" /> All photos
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={lightbox}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl aspect-video mx-16"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={imgUrl(safeImages[lightbox])}
                  alt={imgAlt(safeImages[lightbox], title)}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightbox ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
