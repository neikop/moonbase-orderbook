"use client"
import { Button, HStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { AppLayout } from "components/app"
import { toaster } from "components/ui/toaster"
import { bsxService } from "services"

const Home = () => {
  const { data: products } = useQuery({
    queryFn: () => bsxService.fetchProducts(),
    queryKey: ["bsxService.fetchProducts"],
  })

  console.log(products)

  return (
    <AppLayout>
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
    </AppLayout>
  )
}

export default Home
