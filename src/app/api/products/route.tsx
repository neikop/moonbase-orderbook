import { bsxService } from "services"

export async function GET() {
  const products = await bsxService.fetchProducts()
  return Response.json({ products })
}
