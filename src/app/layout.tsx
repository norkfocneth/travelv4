import type { Metadata } from 'next';
import { Playfair_Display, Inter, Outfit } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import './globals.css';

/* ═══════════════════════════════════════════════════════════════
   Font Configuration
   ═══════════════════════════════════════════════════════════════ */

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/* ═══════════════════════════════════════════════════════════════
   SEO Metadata
   ═══════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'Asian Season Travel Representative | Luxury Asia Travel Experiences',
  description:
    'Experience the magic of Asia with Asian Season Travel Representative. Premium luxury travel to Vietnam, India, Thailand, Singapore, Malaysia & Bali.',
  keywords: [
    'luxury travel',
    'Asia travel',
    'Vietnam tours',
    'India tours',
    'Thailand travel',
    'Singapore',
    'Malaysia',
    'Bali',
    'premium travel experiences',
    'Asian Season Travel',
  ],
  authors: [{ name: 'Asian Season Travel Representative' }],
  openGraph: {
    title: 'Asian Season Travel Representative | Luxury Asia Travel Experiences',
    description:
      'Experience the magic of Asia with Asian Season Travel Representative. Premium luxury travel to Vietnam, India, Thailand, Singapore, Malaysia & Bali.',
    type: 'website',
    locale: 'en_US',
  },
};

/* ═══════════════════════════════════════════════════════════════
   Root Layout
   ═══════════════════════════════════════════════════════════════ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
