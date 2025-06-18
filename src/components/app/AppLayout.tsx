import { Box } from "@chakra-ui/react"
import { AppHeader } from "components/app"
import { PropsWithChildren } from "react"

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <AppHeader />
      <Box p={4}>{children}</Box>
    </Box>
  )
}

export default AppLayout
