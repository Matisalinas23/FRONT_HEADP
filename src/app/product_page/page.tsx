"use client"

import React, { useEffect, useState } from "react"
import productStore from "../store/productStore"
import { useShallow } from "zustand/shallow"
import { useProducts } from "../hooks/useProducts"
import ProductCardCarrousel from "../components/ProductCardCarrousel"
import Sidebar from "../components/Sidebar"
import { useSearchParams } from "next/navigation"
import Loading from "../components/Loading/Loading"

export default function ProductPageClient() {
  // stores (global states)
  const { products, setProducts } = productStore(
    useShallow((state) => ({
      products: state.products,
      setProducts: state.setProducts,
    }))
  )

  // hooks
  const { getProducts } = useProducts()

  useEffect(() => {
    getProducts()
  }, [])

  // SearchProduct
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""

  const filteredProducts = products.filter((product) => {
    const searchWords = search.toLowerCase().split(/\s+/)
    const productWords = product.name.toLowerCase().split(/\s+/)

    return searchWords.every((word) =>
      productWords.some((pw) => pw.includes(word))
    )
  })

  if (!products || products.length === 0) {
    return(
      <div className="h-[80vh] w-full pt-16 flex items-center justify-between">
        <Sidebar setProducts={setProducts} />
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-[2rem] text-neutral-500 font-semibold">No hay productos...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="h-fit px-8 py-16 flex">
      <Sidebar setProducts={setProducts} />

      <div className="h-fit flex-1 py-4 border-l-2 border-[var(--gray)] flex flex-wrap justify-center gap-24">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCardCarrousel key={product.id} product={product} />
            ))
          : products && products.map((product) => (
              <ProductCardCarrousel key={product.id} product={product} />
            ))}
      </div>
    </div>
  )
}
