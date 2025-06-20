"use client"
import { HStack, Stack, Tag, Text } from "@chakra-ui/react"
import { OrderItem, OrderItemDummy } from "components/Orderbook"
import { useOrderBookSocket } from "hooks/useOrderBookSocket"
import { useMemo } from "react"
import { useProductStore } from "store/productStore"

const Orderbook = () => {
  const { data, isLoading } = useOrderBookSocket()
  const { product } = useProductStore()

  const middleOrder = useMemo(() => {
    const mimAsk = data.asks.slice(-1)[0]
    const maxBid = data.bids[0]
    return {
      gap: mimAsk.price - maxBid.price,
      price: (mimAsk.price + maxBid.price) / 2,
    }
  }, [data])

  const cumulativeAskSize = data.asks[0].cumulativeSize
  const cumulativeBidSize = data.bids.slice(-1)[0].cumulativeSize

  return (
    <Stack gap={1}>
      <HStack backgroundColor="gray.50" h={8} px={1}>
        <HStack flex={2} justifyContent="center">
          <Text color="textSecondary" fontSize="xs" fontWeight="semibold">
            Price
          </Text>
          <Tag.Root backgroundColor="white">
            <Tag.Label>USDC</Tag.Label>
          </Tag.Root>
        </HStack>
        <HStack flex={1} justifyContent="right">
          <Text color="textSecondary" fontSize="xs" fontWeight="semibold">
            Size
          </Text>
          <Tag.Root backgroundColor="white">
            <Tag.Label>{product?.base_asset_symbol}</Tag.Label>
          </Tag.Root>
        </HStack>
      </HStack>
      <Stack gap={0.5}>
        <Stack gap={0.5} overflowY="hidden">
          {data.asks.map((item, index) => {
            return (
              <OrderItem
                isAsk={true}
                isLoading={isLoading}
                key={index}
                maxSize={cumulativeAskSize}
                priceIncrement={product?.quote_increment}
                sizeIncrement={product?.base_increment}
                {...item}
              />
            )
          })}
        </Stack>

        <OrderItemDummy
          price={middleOrder.price}
          priceIncrement={product?.quote_increment}
          size={middleOrder.gap}
          sizeIncrement={product?.quote_increment}
        />

        <Stack gap={1} overflowY="hidden">
          {data.bids.map((item, index) => {
            return (
              <OrderItem
                isAsk={false}
                isLoading={isLoading}
                key={index}
                maxSize={cumulativeBidSize}
                priceIncrement={product?.quote_increment}
                sizeIncrement={product?.base_increment}
                {...item}
              />
            )
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Orderbook
