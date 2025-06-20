"use client"
import { Show, Stack } from "@chakra-ui/react"
import { OrderbookFilter, OrderItem, OrderItemDummy, OrderItemHeader } from "components/Orderbook"
import { useOrderBookSocket } from "hooks/useOrderBookSocket"
import { useMemo } from "react"
import { useOrderbookStore } from "store/orderbookStore"
import { useProductStore } from "store/productStore"

const Orderbook = () => {
  const { data, isLoading } = useOrderBookSocket()
  const { product } = useProductStore()
  const { orderType } = useOrderbookStore()

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
    <Stack gap={2} h={600}>
      <OrderbookFilter />

      <Stack flex={1} gap={1} minH={0}>
        <OrderItemHeader symbol={product?.base_asset_symbol} />

        <Stack flex={1} gap={0.5} minH={0}>
          <Show when={orderType === "full" || orderType === "ask"}>
            <Stack flex={1} gap={0.5} justifyContent="flex-end" minH={0} overflowY="hidden">
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
          </Show>

          <Show when={orderType === "full"}>
            <OrderItemDummy
              price={middleOrder.price}
              priceIncrement={product?.quote_increment}
              size={middleOrder.gap}
              sizeIncrement={product?.quote_increment}
            />
          </Show>

          <Show when={orderType === "full" || orderType === "bid"}>
            <Stack flex={1} gap={0.5} minH={0} overflowY="hidden">
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
          </Show>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Orderbook
