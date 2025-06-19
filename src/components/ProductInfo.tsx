"use client"
import { Box, Center, HStack, StackSeparator, Text } from "@chakra-ui/react"
import { formatPrice } from "utils/common"

type Props = {
  product: null | Product
}

const ProductInfo = ({ product }: Props) => {
  return (
    <HStack alignItems="stretch" flex={1} gap={0} h={14} minW={1} separator={<StackSeparator />} w="full">
      <Center minW={100} p={2}>
        <Text color="fg.success" fontWeight="bold">
          {formatPrice(product?.index_price)}
        </Text>
      </Center>
      <HStack gap={0} overflowX="auto">
        <Box px={3} py={2}>
          <Text color="textSecondary" fontSize="xs">
            Mark Price
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {formatPrice(product?.mark_price)}
          </Text>
        </Box>
        <Box px={3} py={2}>
          <Text color="textSecondary" fontSize="xs">
            Index Price
          </Text>
          <Text fontSize="sm" fontWeight="semibold">
            {formatPrice(product?.mark_price)}
          </Text>
        </Box>
      </HStack>
    </HStack>
  )
}

export { ProductInfo }
