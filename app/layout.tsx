import { ContextProviders } from "../components/ContextProviders"

export const metadata = {
  title: "tscircuit - AI text-to-footprint",
  description: "AI footprint generator using tscircuit",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ContextProviders>
        <body>{children}</body>
      </ContextProviders>
    </html>
  )
}
