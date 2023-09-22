import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import { ThemeProvider } from './dashboard/components/theme-provider'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const fontHeading = localFont({
  src: "assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute='class' enableSystem>
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
