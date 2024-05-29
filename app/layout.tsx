import { ContextProviders } from "../components/ContextProviders"

export const metadata = {
  title: "tscircuit - auto footprint",
  description: "AI Automatic footprint using tscircuit",
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
