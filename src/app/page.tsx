"use client"
import { Button, Container, HStack } from "@chakra-ui/react"
import { toaster } from "components/ui/toaster"

export default function Home() {
  return (
    <Container py={10}>
      <HStack>
        <Button
          onClick={() => {
            toaster.create({
              description: "Your transaction was successfully sent",
              title: "Success",
              type: "success",
            })
          }}
        >
          Click me
        </Button>
        <Button disabled>Disabled</Button>
      </HStack>
    </Container>
  )
}
