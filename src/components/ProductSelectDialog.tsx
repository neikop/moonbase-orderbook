"use client"
import { Box, Button, ButtonProps, Dialog, Flex, Input, Portal, Stack, Text, useDialog } from "@chakra-ui/react"
import { useDebounce } from "@uidotdev/usehooks"
import { ProductImage } from "components/ProductImage"
import { useProducts } from "hooks/useProducts"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"

const MdExpandMore = dynamic(() => import("react-icons/md").then((mod) => mod.MdExpandMore), { ssr: false })

type Props = {
  buttonProps?: ButtonProps
  onChange?: (product: null | Product) => void
  value?: null | Product
}

const ProductSelectDialog = ({ buttonProps, onChange, value }: Props) => {
  const dialog = useDialog()

  const [searchText, setSearchText] = useState("")
  const [currentProduct, setCurrentProduct] = useState<null | Product>(null)

  const debouncedSearchText = useDebounce(searchText, 100)

  const selectedProduct = value !== undefined ? value : currentProduct

  const { data: products } = useProducts()

  const availableProducts = useMemo(() => {
    return (products ?? []).filter((product) => {
      if (!product.product_id.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())) {
        return false
      }
      return product.is_active && product.visible
    })
  }, [products, debouncedSearchText])

  useEffect(() => {
    if (dialog.open) {
      setSearchText("")
    }
  }, [dialog.open])

  return (
    <Dialog.RootProvider placement="top" scrollBehavior="inside" size="sm" value={dialog}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" {...buttonProps}>
          {selectedProduct ? (
            <>
              <ProductImage product={selectedProduct} />
              {selectedProduct.product_id}
            </>
          ) : (
            "Select Product"
          )}
          <Flex flex={1} justifyContent="flex-end">
            <MdExpandMore className="!h-6 !w-6" />
          </Flex>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content overflow="hidden">
            <Dialog.Header borderBottomWidth={1}>
              <Input
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search..."
                size="xl"
                value={searchText}
              />
            </Dialog.Header>
            <Dialog.Body maxH={600} overflowY="auto">
              <Stack gap={2} minH={240}>
                {availableProducts.map((product) => {
                  const isSelected = product.product_id === selectedProduct?.product_id
                  return (
                    <Button
                      borderRadius={8}
                      colorPalette={isSelected ? "purple" : "gray"}
                      justifyContent="flex-start"
                      key={product.product_id}
                      minH={12}
                      onClick={async () => {
                        setCurrentProduct(product)
                        onChange?.(product)
                        dialog.setOpen(false)
                      }}
                      px={2}
                      variant={isSelected ? "subtle" : "ghost"}
                    >
                      <ProductImage product={product} />

                      <Box flex={1} overflow="hidden" textAlign="left">
                        <Text>{product.product_id}</Text>
                      </Box>
                    </Button>
                  )
                })}
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}

export { ProductSelectDialog }
