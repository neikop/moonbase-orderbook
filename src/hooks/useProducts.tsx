import { useQuery } from "@tanstack/react-query"
import { apiClient } from "services/clients"

export const useProducts = () => {
  return useQuery({
    queryFn: async () => {
      const response = await apiClient.get<{ products: Product[] }>("/api/products")
      return response.data?.products
    },
    queryKey: ["products"],
  })
}
