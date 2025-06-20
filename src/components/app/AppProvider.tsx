"use client"
import { ChakraProvider, Theme } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { chakraSystem } from "components/ui/theme"
import { queryClient } from "configs/queryClient"
import { PropsWithChildren } from "react"

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={chakraSystem}>
        <Theme appearance="light">{children}</Theme>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
