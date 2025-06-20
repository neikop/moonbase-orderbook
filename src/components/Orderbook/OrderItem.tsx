"use client"
import { Box, Flex, HStack, Show, Stack, Text } from "@chakra-ui/react"
import { Tooltip } from "components/ui/Tooltip"
import { Order } from "hooks/useOrderBookSocket"
import React, { useState } from "react"
import { formatPriceWithIncrement } from "utils/common"

type Props = {
  isAsk: boolean
  isLoading?: boolean
  maxSize: number
  priceIncrement?: string
  sizeIncrement?: string
} & Order

const OrderItem = React.memo((props: Props) => {
  const { cumulativeSize, isAsk, maxSize, price, priceIncrement, size, sizeIncrement } = props
  const [isHover, setIsHover] = useState(false)
  const isActive = price > 0
  return (
    <HStack
      {...(isActive && {
        cursor: "pointer",
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
      })}
      h={6}
      position="relative"
      pr={2}
    >
      {isHover && (
        <Tooltip content={<OrderItemInfo {...props} />} open={isHover} positioning={{ placement: "right-end" }}>
          <Box
            backgroundColor="blackAlpha.100"
            h={1500}
            pointerEvents="none"
            position="absolute"
            {...(isAsk ? { top: 0 } : { bottom: 0 })}
            w="full"
          />
        </Tooltip>
      )}
      <Show when={isActive}>
        <Flex h="full" justifyContent="flex-start" position="absolute" w="1/5">
          <Box
            backgroundColor={isAsk ? "#f04339c0" : "#4AD50Cc0"}
            h="full"
            left={0}
            position="absolute"
            transition="width 0.5s ease-in-out"
            width={`${(size / maxSize) * 100}%`}
          />
        </Flex>

        <Box
          backgroundColor={isAsk ? "#f0433920" : "#4AD50C20"}
          h="full"
          left={0}
          position="absolute"
          transition="width 0.5s ease-in-out"
          width={`${(cumulativeSize / maxSize) * 100}%`}
        />
      </Show>
      <Text color={isAsk ? "fg.error" : "fg.success"} flex={2} fontFamily="monospace" fontSize="xs" textAlign="center">
        {price ? formatPriceWithIncrement(price, priceIncrement) : "-"}
      </Text>
      <Text flex={1} fontFamily="monospace" fontSize="xs" textAlign="right">
        {size ? formatPriceWithIncrement(size, sizeIncrement) : "-"}
      </Text>
    </HStack>
  )
})

const OrderItemInfo = React.memo((item: Props) => {
  return (
    <Stack gap={2} minW={180}>
      <Flex gap={4} justifyContent="space-between">
        <Text>Average price</Text>
        <Text fontWeight="semibold" textAlign="right">
          {formatPriceWithIncrement(item.cumulativePrice / item.cumulativeSize, item.priceIncrement)}
        </Text>
      </Flex>
      <Flex gap={4} justifyContent="space-between">
        <Text>Amount</Text>
        <Text fontWeight="semibold" textAlign="right">
          {formatPriceWithIncrement(item.cumulativeSize, item.sizeIncrement)}
        </Text>
      </Flex>
      <Flex gap={4} justifyContent="space-between">
        <Text>Sum</Text>
        <Text fontWeight="semibold" textAlign="right">
          {formatPriceWithIncrement(item.cumulativePrice, item.priceIncrement)} USDC
        </Text>
      </Flex>
    </Stack>
  )
})

export const OrderItemDummy = React.memo(({ price, priceIncrement, size, sizeIncrement }: Partial<Props>) => {
  return (
    <HStack backgroundColor="gray.100" h={6} pr={2}>
      <Text flex={2} fontFamily="monospace" fontSize="xs" textAlign="center">
        {price ? formatPriceWithIncrement(price, priceIncrement) : "-"}
      </Text>
      <Text flex={1} fontFamily="monospace" fontSize="xs" textAlign="right">
        {size ? formatPriceWithIncrement(size, sizeIncrement) : "-"}
      </Text>
    </HStack>
  )
})

export default OrderItem
