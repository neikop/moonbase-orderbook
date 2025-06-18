import { bsxClient } from "services/clients"

const fetchProducts = async () => {
  const response = await bsxClient.get<{ products: Product[] }>("/products")
  return response.data?.products
}

export const bsxService = {
  fetchProducts,
}
