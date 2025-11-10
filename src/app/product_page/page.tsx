import { Suspense } from "react"
import ProductPageClient from "./ProductPageClient"
import Loading from "../components/Loading/Loading"

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="h-86 flex items-center justify-center"><Loading/></div>}>
      <ProductPageClient />
    </Suspense>
  )
}
