import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import '../global-styles.css'

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: 'LavtradePro Shipemnts and Global Logistics | Fast & Reliable Shipping',
  description: 'LavtradePro provides world-class logistics solutions including air freight, ocean freight, ground delivery, and warehousing services worldwide.',
  keywords: ['logistics', 'shipping', 'freight', 'delivery', 'warehousing', 'international shipping'],
  icons: {
    icon: [
      {
        url: '/',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1E4A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        <Analytics />

        {/* Smartsupp Live Chat */}
        <Script id="smartsupp-chat" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '';

            window.smartsupp || (function(d) {
              var s, c, o = smartsupp = function() { o._.push(arguments) };
              o._ = [];
              s = d.getElementsByTagName('script')[0];
              c = d.createElement('script');
              c.type = 'text/javascript';
              c.charset = 'utf-8';
              c.async = true;
              c.src = 'https://www.smartsuppchat.com/loader.js?';
              s.parentNode.insertBefore(c, s);
            })(document);
          `}
        </Script>
      </body>
    </html>
  )
}
