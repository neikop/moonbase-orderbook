import type { Metadata } from "next"

import { ChakraProvider } from "@chakra-ui/react"
import { chakraSystem } from "components/ui/theme"
import { Toaster } from "components/ui/toaster"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  description: "This page will help you get started with Orderbook Websocket",
  title: "Orderbook",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ChakraProvider value={chakraSystem}>
          <Toaster />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
