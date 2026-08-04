import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { SavedProvider } from "@/context/SavedContext";
import { OpportunitiesProvider } from "@/context/OpportunitiesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KaarYab Afghanistan - Opportunity Finder",
  description:
    "Find jobs, internships, scholarships, remote work and skill-building opportunities for Afghan youth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
        style={{ fontFamily: "Vazirmatn, Inter, sans-serif" }}
      >
        <LanguageProvider>
          <ThemeProvider>
            <OpportunitiesProvider>
              <SavedProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </SavedProvider>
            </OpportunitiesProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}