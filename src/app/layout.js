import { Orbitron, Space_Mono } from 'next/font/google'
import './globals.css'
import { Web5Provider } from './Web5Context'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })

export const metadata = {
  title: 'Contemeleon',
  description: 'Get different forms of the same content in one click.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${spaceMono.variable}`}>

        <Web5Provider>
          {children}
        </Web5Provider>

      </body>
    </html>
  )
}
