"use client";

import React, { type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog";

type ViewDetailsModalProps = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
};

export default function ViewDetailsModal({
  trigger,
  title,
  children,
}: ViewDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl border border-neutral-200 bg-white p-6 sm:p-8 text-[#111111] outline-none">
        <DialogHeader className="mb-4 border-b border-neutral-200 pb-4">
          <DialogTitle className="font-display text-xl font-extrabold uppercase tracking-wider text-[#111111]">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

