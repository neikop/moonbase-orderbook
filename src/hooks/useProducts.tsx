import { useQuery } from "@tanstack/react-query"
import { bsxService } from "services"

export const useProducts = () => {
  return useQuery({
    queryFn: () => bsxService.fetchProducts(),
    queryKey: ["bsxService.fetchProducts"],
  })
}
