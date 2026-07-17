import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ammar-ahmed.dev"),
  title: "Ammar Ahmed — Full-Stack Developer & Applied AI Engineer",
  description:
    "Full-stack developer and applied AI engineer building production-ready products with React, TypeScript, Node.js and Python.",
  openGraph: {
    title: "Ammar Ahmed — Product Engineer Portfolio",
    description:
      "Full-stack software and applied AI, built for real operations.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${space.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
