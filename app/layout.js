import './globals.css'
import { Inter } from 'next/font/google'
import ProviderWrapper from './ProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CV Matcher',
  description: 'Match your CVs with job descriptions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  )
}

