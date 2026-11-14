import type { Metadata, Viewport } from "next";
import "@src/styles/fonts.css";
import "@src/styles/globals.css";
import { type ReactNode } from "react";
import { Toaster } from "@src/components/ui/sonner";
import DefaultLayout from "@src/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Wiz Ofuasia",
  description: "src/app/layout.tsx",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D70E1D",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans antialiased">
      <body className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <DefaultLayout>{children}</DefaultLayout>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

