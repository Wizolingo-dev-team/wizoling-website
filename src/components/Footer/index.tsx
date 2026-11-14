"use client";

import React from "react";
import Link from "next/link";
import { FOOTER_SECTIONS } from "@src/constants/navigation";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#222222] text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="font-display text-lg font-bold tracking-wider uppercase text-white">
              Footer/index.tsx
            </p>
            <p className="text-xs text-white/65">
              src/components/Footer/index.tsx
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="font-display text-sm font-bold tracking-wider uppercase text-white">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-xs text-white/65">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-[#D70E1D]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

