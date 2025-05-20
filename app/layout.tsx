import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Nguyễn Công Anh Dev',
  description: 'Created by Nguyễn Công Anh',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          {children}
        </body>
      </html>
    </ThemeProvider >
  )
}
