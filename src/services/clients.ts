import { create } from "apisauce"

const bsxClient = create({
  baseURL: "https://api.bsx.exchange",
})

export { bsxClient }
