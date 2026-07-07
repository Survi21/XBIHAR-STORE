
"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images?.[0] || "");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 🔍 Zoom States
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  const getSafeSrc = (srcString: string) => {
    if (!srcString) return "/placeholder.png";
    if (srcString.startsWith("/") || srcString.startsWith("http")) {
      return srcString;
    }
    return `/${srcString}`;
  };

  const handleNext = useCallback(() => {
    setIsZoomed(false); // Reset zoom on change
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false); // Reset zoom on change
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images]);

  const handleClose = useCallback(() => {
    setIsZoomed(false);
    setIsOpen(false);
  }, []);

  const openFullscreen = (imageSrc: string) => {
    const idx = images.indexOf(imageSrc);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setIsOpen(true);
  };

  // 🎯 Mouse Move for Zoom Lens Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, handleClose]);

  if (!images || images.length === 0) {
    return <div className="w-full h-[600px] bg-zinc-900 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border ${
              mainImage === image ? "border-white" : "border-zinc-700"
            }`}
          >
            <Image src={getSafeSrc(image)} alt="thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div 
        onClick={() => openFullscreen(mainImage)}
        className="relative w-full md:w-[500px] h-[600px] rounded-2xl overflow-hidden bg-zinc-900 cursor-zoom-in group"
      >
        <Image
          src={getSafeSrc(mainImage)}
          alt="product"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* 🔮 FULLSCREEN LIGHTBOX MODAL WITH ZOOM */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none backdrop-blur-sm">
          
          {/* Top Header */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-white/80 z-20">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length} {isZoomed && "(Zoomed)"}
            </span>
            <div className="flex items-center gap-4">
              {/* Zoom Toggle Button */}
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs rounded-md border border-zinc-700 text-white transition-colors"
              >
                {isZoomed ? "Zoom Out 🔍" : "Zoom In 🔍"}
              </button>
              <button onClick={handleClose} className="p-2 hover:bg-zinc-800 rounded-full text-2xl font-light">
                ✕
              </button>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-5 z-20 p-4 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-white border border-zinc-800 md:block hidden"
          >
            ←
          </button>

          {/* Center Image Container with Zoom Logic */}
          <div 
            className={`relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center overflow-hidden ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
          >
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: isZoomed ? `scale(2.2)` : `scale(1)`,
                transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center center",
              }}
            >
              <Image
                src={getSafeSrc(images[currentIndex])}
                alt="Fullscreen product view"
                width={1200}
                height={1200}
                className="object-contain max-h-[85vh] w-auto h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-5 z-20 p-4 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-white border border-zinc-800 md:block hidden"
          >
            →
          </button>

          {/* Bottom Mobile Controls */}
          <div className="absolute bottom-6 flex gap-4 md:hidden z-20">
            <button onClick={handlePrev} className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg">← Prev</button>
            <button onClick={() => setIsZoomed(!isZoomed)} className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg">Zoom</button>
            <button onClick={handleNext} className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg">Next →</button>
          </div>

        </div>
      )}
    </div>
  );
}