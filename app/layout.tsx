import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Malinda dan Abi",
  description: "To our friends and family: We're so excited to celebrate our wedding with you. Find all the details you need to know about our big day here.",
  authors: [{ name: "fajarpng" }],
  creator: "fajarpng",
  publisher: "fajarpng",
  openGraph: {
    images: {
      url: "https://wedding-malinda-abi.vercel.app/malinda/3.jpeg", // replace with your wedding banner/cover image
      width: 1200,
      height: 630,
      alt: "The Wedding of Malinda & Abi",
    },
}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
