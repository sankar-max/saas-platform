import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { TRPCProvider } from "@/trpc/client"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  )
}
