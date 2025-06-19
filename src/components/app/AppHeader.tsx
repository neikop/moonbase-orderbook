import { Center, Container, Flex, Image } from "@chakra-ui/react"
import Link from "next/link"

const AppHeader = () => {
  return (
    <Container borderBottomWidth={1} fluid px={4}>
      <Flex alignItems="stretch" h={14} justifyContent="space-between">
        <Center>
          <Link href="/">
            <Image alt="logo" h={10} src="/favicon.ico" />
          </Link>
        </Center>

        {/*  */}
        {/*  */}
      </Flex>
    </Container>
  )
}

export default AppHeader
