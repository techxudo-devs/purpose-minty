import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Playfair_Display,
  DM_Sans,
  Ephesis,
} from "next/font/google";
import SmoothScroll from "@/components/common/SmoothScroll";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-pop",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-play",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ephesis = Ephesis({
  variable: "--font-ep",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PurposeMint",
  description:
    "PurposeMint helps you save a little at a time, safely — and turns those savings into a way forward.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${playfairDisplay.variable} ${dmSans.variable} ${ephesis.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
