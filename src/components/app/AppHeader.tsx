import { Center, Container, Flex, Image } from "@chakra-ui/react"
import Link from "next/link"

const AppHeader = () => {
  return (
    <Container bg="bg.inverted" fluid>
      <Flex alignItems="stretch" justifyContent="space-between" minH={16}>
        <Center p={2}>
          <Link href="/">
            <Image alt="logo" h={10} src="/vercel.svg" />
          </Link>
        </Center>

        {/*  */}
        {/*  */}
      </Flex>
    </Container>
  )
}

export default AppHeader
