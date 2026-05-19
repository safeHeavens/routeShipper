import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RouteShipper',
  description:
    'RouteShipper powers global commerce with efficient freight, logistics, and delivery solutions trusted by businesses worldwide.',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'RouteShipper',
    description:
      'RouteShipper powers global commerce with efficient freight, logistics, and delivery solutions trusted by businesses worldwide.',
    url: 'https://routshipper.com',
    siteName: 'RouteShipper',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RouteShipper Global Logistics Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RouteShipper',
    description:
      'RouteShipper powers global commerce with efficient freight, logistics, and delivery solutions trusted by businesses worldwide.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
