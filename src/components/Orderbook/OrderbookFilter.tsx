import { Button, ButtonGroup, Image } from "@chakra-ui/react"
import { OrderType, useOrderbookStore } from "store/orderbookStore"

const OrderbookFilter = () => {
  const { orderType, setOrderType } = useOrderbookStore()

  return (
    <ButtonGroup colorPalette="purple" size="sm">
      {[
        { icon: "https://app.bsx.exchange/icons/order-book-default.svg", type: "full" },
        { icon: "https://app.bsx.exchange/icons/order-book-bid.svg", type: "bid" },
        { icon: "https://app.bsx.exchange/icons/order-book-ask.svg", type: "ask" },
      ].map((item) => (
        <Button
          key={item.type}
          onClick={() => setOrderType(item.type as OrderType)}
          variant={orderType === item.type ? "surface" : "outline"}
        >
          <Image alt="default" src={item.icon} />
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default OrderbookFilter
