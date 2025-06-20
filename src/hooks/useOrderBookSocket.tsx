import { useEffect, useState } from "react"
import { useProductStore } from "store/productStore"

export type Order = {
  cumulativePrice: number
  cumulativeSize: number
  price: number
  size: number
}

type OrderBookData = {
  channel: "book"
  data: {
    asks: RawOrder[]
    bids: RawOrder[]
  }
  product: string
  timestamp: number
  type: "snapshot" | "update"
}

type OrderBookState = {
  asks: RawOrder[]
  bids: RawOrder[]
}
type RawOrder = [string, string]

export const useOrderBookSocket = () => {
  const { product } = useProductStore()

  const [orderBookState, setOrderBookState] = useState<OrderBookState>({ asks: [], bids: [] })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!product?.product_id) return

    const socket = new WebSocket("wss://ws.bsx.exchange/ws")

    socket.onopen = () => {
      socket.send(JSON.stringify({ channel: "book", op: "sub", product: product.product_id }))
      setIsLoading(true)
    }

    socket.onmessage = (event) => {
      const data: OrderBookData = JSON.parse(event.data)

      if (data.type === "snapshot") {
        setOrderBookState(normalizeOrderState(data.data))
        setIsLoading(false)
      }
      if (data.type === "update") {
        setOrderBookState((prev) => {
          const newAsks = prev.asks || []
          const newBids = prev.bids || []
          data.data.asks.forEach(([price, size]) => {
            const index = newAsks.findIndex((ask) => ask[0] === price)
            if (index >= 0) {
              newAsks[index] = [price, size]
            } else {
              newAsks.push([price, size])
            }
          })
          data.data.bids.forEach(([price, size]) => {
            const index = newBids.findIndex((bid) => bid[0] === price)
            if (index >= 0) {
              newBids[index] = [price, size]
            } else {
              newBids.push([price, size])
            }
          })
          return normalizeOrderState({ asks: newAsks, bids: newBids })
        })
      }
    }

    socket.onclose = () => {
      socket.send(JSON.stringify({ channel: "book", op: "unsub", product: product.product_id }))
    }

    return () => {
      socket.close()
      setOrderBookState({ asks: [], bids: [] })
    }
  }, [product?.product_id])

  return { data: normalizeOrderData(orderBookState), isLoading }
}

const normalizeOrderState = ({ asks, bids }: OrderBookState) => {
  // Filter out entries with zero size and sort by ascending price for asks, descending price for bids
  return {
    asks: asks.filter((ask) => +ask[1] > 0).sort((a, b) => +a[0] - +b[0]),
    bids: bids.filter((bid) => +bid[1] > 0).sort((a, b) => +b[0] - +a[0]),
  }
}

const normalizeOrderData = ({ asks, bids }: OrderBookState): { asks: Order[]; bids: Order[] } => {
  const normalizeAsks: Order[] = asks
    .map((item) => ({
      cumulativePrice: 0,
      cumulativeSize: 0,
      price: Number(item[0] ?? 0),
      size: Number(item[1] ?? 0),
    }))
    .map(calculateAccumulate)

  const normalizeBids = bids
    .map((item) => ({
      cumulativePrice: 0,
      cumulativeSize: 0,
      price: Number(item[0] ?? 0),
      size: Number(item[1] ?? 0),
    }))
    .map(calculateAccumulate)

  return {
    asks: normalizeAsks.reverse(),
    bids: normalizeBids,
  }
}

const calculateAccumulate = (item: Order, index: number, array: Order[]): Order => {
  const currentPrice = array[index].price * array[index].size
  if (index === 0) {
    item.cumulativePrice = currentPrice
    item.cumulativeSize = array[index].size
  } else {
    item.cumulativePrice = array[index - 1].cumulativePrice + currentPrice
    item.cumulativeSize = array[index - 1].cumulativeSize + array[index].size
  }
  return item
}
