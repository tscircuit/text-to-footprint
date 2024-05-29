"use client"

import { QueryClientProvider, QueryClient, Query } from "react-query"

const qc = new QueryClient()

export const ContextProviders = ({ children }) => {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>
}
