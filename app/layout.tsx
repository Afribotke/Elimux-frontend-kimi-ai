import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ElimuX - Discover Global Education Opportunities",
    template: "%s | ElimuX",
  },
  description:
    "Find and apply to universities, colleges, and programs worldwide. AI-powered education discovery platform.",
  keywords: [
    "education",
    "university",
    "college",
    "study abroad",
    "Kenya",
    "Africa",
    "scholarships",
    "programs",
  ],
  authors: [{ name: "ElimuX" }],
  creator: "ElimuX",
  metadataBase: new URL("https://elimux.ke"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elimux.ke",
    siteName: "ElimuX",
    title: "ElimuX - Discover Global Education Opportunities",
    description:
      "Find and apply to universities, colleges, and programs worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElimuX - Discover Global Education Opportunities",
    description:
      "Find and apply to universities, colleges, and programs worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
