import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milan Sathi",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-body-color/80 flex-1 h-full">
      <head>
        <link rel="icon" href="/pu" />
      </head>
      <body
        className={`${plusJakartaSans.className} bg-body-color/80 tracking-wide text-white min-h-[100vh]`}
      >
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
