import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Vivek Raj — Full Stack Developer',
  description:
    'Explore the portfolio of Vivek Raj. Full-stack projects, web apps, and more.',
  openGraph: {
    title: 'Vivek Raj — Full Stack Developer',
    description:
      'Explore the portfolio of Vivek Raj. Full-stack projects, web apps, and more.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
