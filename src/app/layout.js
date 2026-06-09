import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lips-luminary.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),

  // ── Title ──────────────────────────────────────────────────────────────
  title: {
    default: 'LIPS Luminary — Student Achievement Portfolio',
    template: '%s — LIPS Luminary',
  },

  // ── Core SEO ───────────────────────────────────────────────────────────
  description:
    'LIPS Luminary is the official digital portfolio and achievement hub for students of LIPS School. Discover academic accomplishments, sports victories, arts milestones, and more.',
  keywords: [
    'LIPS School',
    'LIPS Luminary',
    'student portfolio',
    'student achievements',
    'school hub',
    'digital portfolio',
    'student showcase',
  ],
  authors: [{ name: 'LIPS School', url: siteUrl }],
  creator: 'LIPS School',
  publisher: 'LIPS School',
  applicationName: 'LIPS Luminary',
  category: 'education',

  // ── Canonical & Alternates ─────────────────────────────────────────────
  alternates: {
    canonical: '/',
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ─────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'LIPS Luminary',
    title: 'LIPS Luminary — Student Achievement Portfolio',
    description:
      'The official digital portfolio and achievement hub for LIPS School students. Explore accomplishments across academics, sports, arts, and more.',
    images: [
      {
        url: '/lips_talk.png',
        width: 1200,
        height: 630,
        alt: 'LIPS Luminary — Student Achievement Portfolio',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'LIPS Luminary — Student Achievement Portfolio',
    description:
      'The official digital portfolio and achievement hub for LIPS School students.',
    images: ['/lips_talk.png'],
  },

  // ── Robots ────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
