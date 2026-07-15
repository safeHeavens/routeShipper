import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lavtradepro Shipments',
  description:
    'LavtradePro Shipments provides fast, secure, and reliable global logistics, freight forwarding, cargo transportation, and delivery solutions, connecting businesses and customers across the world with seamless shipping services.\n',

  icons: {
    icon: '/lav-.ico',
    shortcut: '/lav-.jpg',
    apple: '/lav-.jpg',
  },

  openGraph: {
    title: 'Lavtradepro Shipments',
    description:
      'LavtradePro Shipments provides fast, secure, and reliable global logistics, freight forwarding, cargo transportation, and delivery solutions, connecting businesses and customers across the world with seamless shipping services.\n',
    url: 'https://lavtradeproshipments.com',
    siteName: 'Lavtradepro Shipments',
    images: [
      {
        url: '/images/hero-bg-jet.png',
        width: 1200,
        height: 630,
        alt: 'Lavtradepro Shipments and Global Logistics Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Lavtradepro Shipments',
    description:
      'LavtradePro Shipments provides fast, secure, and reliable global logistics, freight forwarding, cargo transportation, and delivery solutions, connecting businesses and customers across the world with seamless shipping services.\n',
    images: ['/images/hero-bg-jet.png'],
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
