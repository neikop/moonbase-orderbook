import { create } from "apisauce"

const bsxClient = create({
  baseURL: "https://api.bsx.exchange",
})

const apiClient = create({
  baseURL: "/",
})

export { apiClient, bsxClient }
