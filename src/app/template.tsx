import { Box, Stack } from "@chakra-ui/react"
import { AppHeader } from "components/app"
import { PropsWithChildren } from "react"

const Template = ({ children }: PropsWithChildren) => {
  return (
    <Stack gap={0} h="100vh">
      <AppHeader />
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Stack>
  )
}

export default Template
