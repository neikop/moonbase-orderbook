"use client"
import { Box, Grid, HStack, Stack, StackSeparator, Text } from "@chakra-ui/react"
import { Orderbook } from "components/Orderbook"
import { ProductInfo } from "components/ProductInfo"
import { ProductSelectDialog } from "components/ProductSelectDialog"
import { useProducts } from "hooks/useProducts"
import { useEffect } from "react"
import { useProductStore } from "store/productStore"

const Home = () => {
  const { product, setProduct } = useProductStore()

  const { data: products } = useProducts()

  useEffect(() => {
    if (!product?.product_id && products?.[0]) {
      setProduct(products?.[0])
    }
  }, [setProduct, products, product?.product_id])

  return (
    <Stack flex={1} gap={0} separator={<StackSeparator />}>
      <HStack alignItems="stretch" flexWrap="wrap" gap={0} w="full">
        <ProductSelectDialog
          buttonProps={{
            borderColor: "border",
            h: 14,
            justifyContent: "flex-start",
            md: { borderRightWidth: 1 },
            mdDown: { borderBottomWidth: 1, w: "full" },
            minW: 240,
            rounded: "none",
            size: "xl",
          }}
          onChange={setProduct}
          value={product}
        />

        <ProductInfo product={product} />
      </HStack>

      <Grid
        flex={1}
        md={{
          gridTemplateAreas: `"trading-view orderbook trade-box"
                              "history-card history-card trade-box"`,
          gridTemplateColumns: "1fr 320px 360px",
          gridTemplateRows: "1fr 240px",
        }}
        mdDown={{
          display: "flex",
        }}
      >
        <Box borderRightWidth={1} gridArea="trading-view" mdDown={{ display: "none" }}>
          <Box p={2}>
            <Text color="textSecondary">Trading View</Text>
          </Box>
        </Box>
        <Box gridArea="orderbook" mdDown={{ flex: 1 }} p={2}>
          <Orderbook />
        </Box>
        <Box borderLeftWidth={1} gridArea="trade-box" mdDown={{ display: "none" }}>
          <Box p={2}>
            <Text color="textSecondary">Trade Box</Text>
          </Box>
        </Box>
        <Box borderTopWidth={1} gridArea="history-card" mdDown={{ display: "none" }}>
          <Box p={2}>
            <Text color="textSecondary">History Card</Text>
          </Box>
        </Box>
      </Grid>
      <Box />
    </Stack>
  )
}

export default Home
