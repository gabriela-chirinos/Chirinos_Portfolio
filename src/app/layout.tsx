import type { Metadata } from 'next'
import { Epilogue, Playfair_Display } from 'next/font/google'
import './globals.css'

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-epilogue',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gabriela Chirinos — Frontend Developer',
  description:
    'Freelance frontend developer crafting refined digital experiences. UI components, full product builds, design systems, and creative development.',
  openGraph: {
    title: 'Gabriela Chirinos — Frontend Developer',
    description: 'Crafting refined digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${epilogue.variable} ${playfair.variable}`}>
      <body className="bg-parchment text-slate-navy antialiased">
        {children}
      </body>
    </html>
  )
}
