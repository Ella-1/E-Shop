import type { Metadata } from 'next'
import {Poppins} from 'next/font/google'
import './globals.css'
import NavBar from './components/Nav/NavBar'
import Footer from './components/footer/Footer'

const poppins = Poppins({ subsets: ['latin'], weight:['400','700']})

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'Ecommerce App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavBar />
        <main>{children}</main>
        <Footer />
        </body>
    </html>
  )
}
