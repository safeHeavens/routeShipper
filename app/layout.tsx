import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'RouteShipper',
    description: 'Logistics and Shipping Platform',
    icons: {
        icon: '/favicon.ico', // Standard favicon
        shortcut: '/shortcut-icon.png', // Optional
        apple: '/apple-touch-icon.png', // Optional for iOS
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}