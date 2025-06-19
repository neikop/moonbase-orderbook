import { Image, ImageProps } from "@chakra-ui/react"

type Props = {
  product: Product
} & ImageProps

const ProductImage = ({ product, ...props }: Props) => {
  return (
    <Image
      alt={product.product_id}
      h={6}
      rounded="full"
      src={`https://app.bsx.exchange/crypto-icons/${product.base_asset_symbol.toLowerCase()}.svg`}
      w={6}
      {...props}
    />
  )
}

export { ProductImage }
