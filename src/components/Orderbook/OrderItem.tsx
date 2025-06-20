"use client"
import { Box, Flex, HStack, Show, Text } from "@chakra-ui/react"
import React from "react"
import { formatPriceWithIncrement } from "utils/common"

type Props = {
  cumulativeSize: number
  isAsk: boolean
  isLoading?: boolean
  maxSize: number
  price: number
  priceIncrement?: string
  size: number
  sizeIncrement?: string
}

const OrderItem = React.memo(
  ({ cumulativeSize, isAsk, maxSize, price, priceIncrement, size, sizeIncrement }: Props) => {
    return (
      <HStack h={6} position="relative" pr={2}>
        <Show when={price > 0}>
          <Flex h="full" justifyContent="flex-start" position="absolute" w="1/5">
            <Box
              className={isAsk ? "bg-[#f04339]/80" : "bg-[#4AD50C]/80"}
              h="full"
              left={0}
              position="absolute"
              transition="width 0.5s ease-in-out"
              width={`${(size / maxSize) * 100}%`}
            />
          </Flex>

          <Box
            className={isAsk ? "bg-[#f04339]/10" : "bg-[#4AD50C]/10"}
            h="full"
            left={0}
            position="absolute"
            transition="width 0.5s ease-in-out"
            width={`${(cumulativeSize / maxSize) * 100}%`}
          />
        </Show>
        <Text
          className={isAsk ? "text-red-500" : "text-green-500"}
          flex={2}
          fontFamily="monospace"
          fontSize="xs"
          textAlign="center"
        >
          {price ? formatPriceWithIncrement(price, priceIncrement) : "-"}
        </Text>
        <Text flex={1} fontFamily="monospace" fontSize="xs" textAlign="right">
          {size ? formatPriceWithIncrement(size, sizeIncrement) : "-"}
        </Text>
      </HStack>
    )
  },
)

export const OrderItemDummy = ({ price, priceIncrement, size, sizeIncrement }: Partial<Props>) => {
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
}

export default OrderItem
