"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@src/lib/utils";

export type PageBackgroundOverlayProps = {
  imageSrc: string;
  position?: string;
  grayscale?: boolean;
  imageClassName?: string;
  overlayClassName?: string;
};

export default function PageBackgroundOverlay({
  imageSrc,
  position = "center 18%",
  grayscale = true,
  imageClassName,
  overlayClassName,
}: PageBackgroundOverlayProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseMove = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const revealColor = !grayscale || isScrolled || isHovered;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#111111]"
    >
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-no-repeat opacity-85 transition-[filter,transform] duration-1000 ease-out will-change-[filter]",
          revealColor
            ? "grayscale-0 contrast-105 brightness-[0.82]"
            : "grayscale contrast-125 brightness-90",
          imageClassName
        )}
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundPosition: position,
        }}
      />
      {/* Protective contrast scrim so all fonts & content remain crisp in both B&W and color */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85 transition-opacity duration-700",
          overlayClassName
        )}
      />
    </div>
  );
}
