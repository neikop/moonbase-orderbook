"use client"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { chakraSystem } from "components/ui/theme"
import { Toaster } from "components/ui/toaster"
import { queryClient } from "configs/queryClient"
import { PropsWithChildren } from "react"

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={chakraSystem}>
        <Toaster />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
