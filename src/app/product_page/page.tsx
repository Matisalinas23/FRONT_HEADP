// src/app/product_page/page.tsx
import { Suspense } from "react"
import ProductPageClient from "./ProductPageClient"

export default function Page() {
  return (
    <Suspense fallback={<p>Cargando productos...</p>}>
      <ProductPageClient />
    </Suspense>
  )
}
