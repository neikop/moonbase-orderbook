export const formatPrice = (price?: number | string, options?: Intl.NumberFormatOptions) => {
  const value = Number(price ?? 0)
  return value.toLocaleString("en-US", {
    currency: "USD",
    maximumFractionDigits: value > 1000 ? 0 : value > 10 ? 2 : 4,
    style: "currency",
    ...options,
  })
}
