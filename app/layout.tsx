import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApplyProvider } from "@/components/ApplyProvider";
import { ApplyModal } from "@/components/ApplyModal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "buildroom — find your co-founder. build something real.",
  description:
    "A curated co-founder matching cohort for serious founders from Indian colleges. People who are done talking and ready to build.",
  metadataBase: new URL("https://buildroom.in"),
  openGraph: {
    title: "buildroom — find your co-founder. build something real.",
    description:
      "A curated co-founder matching cohort for serious founders from Indian colleges.",
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
        <ApplyProvider>
          {children}
          <ApplyModal />
        </ApplyProvider>
      </body>
    </html>
  );
}
