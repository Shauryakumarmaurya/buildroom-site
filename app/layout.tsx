import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApplyProvider } from "@/components/ApplyProvider";
<<<<<<< HEAD
import { ApplyModal } from "@/components/ApplyModal";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";
import { Intro } from "@/components/Intro";
=======
>>>>>>> 3372158 (Restructure landing page, add /apply form page and build imagery)

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "buildroom — where ambitious students become founders.",
  description:
    "A curated startup-building cohort for ambitious students. Find cofounders, build products, launch startups. We're building India's founder room.",
  metadataBase: new URL("https://buildroom.in"),
  openGraph: {
    title: "buildroom — where ambitious students become founders.",
    description:
      "A curated startup-building cohort for ambitious students. Find cofounders. Build products. Launch startups.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-ink antialiased font-sans">
<<<<<<< HEAD
        <Intro />
        <AuthProvider>
          <ApplyProvider>
            {children}
            <ApplyModal />
            <AuthModal />
          </ApplyProvider>
        </AuthProvider>
=======
        <ApplyProvider>{children}</ApplyProvider>
>>>>>>> 3372158 (Restructure landing page, add /apply form page and build imagery)
      </body>
    </html>
  );
}
