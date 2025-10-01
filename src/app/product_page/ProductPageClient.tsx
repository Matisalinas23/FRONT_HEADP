"use client"

import React, { useEffect } from "react"
import useCategories from "../hooks/useCategories"
import productStore from "../store/productStore"
import { useShallow } from "zustand/shallow"
import categoryStore from "../store/categoryStore"
import { useProducts } from "../hooks/useProducts"
import ProductCardCarrousel from "../components/ProductCardCarrousel"
import Sidebar from "../components/Sidebar"
import { useSearchParams } from "next/navigation"

export default function ProductPageClient() {
  // stores (global states)
  const { products, setProducts } = productStore(
    useShallow((state) => ({
      products: state.products,
      setProducts: state.setProducts,
    }))
  )

  const { categories } = categoryStore(
    useShallow((state) => ({
      categories: state.categories,
    }))
  )

  // hooks
  const { getCategories } = useCategories()
  const { getProducts } = useProducts()

  useEffect(() => {
    getCategories()
    getProducts()
  }, [])

  // SearchProduct
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""

  console.log("search value: ", search)

  const filteredProducts = products.filter((product) => {
    const searchWords = search.toLowerCase().split(/\s+/)
    const productWords = product.name.toLowerCase().split(/\s+/)

    return searchWords.every((word) =>
      productWords.some((pw) => pw.includes(word))
    )
  })

  console.log("filtered products: ", filteredProducts)

  return (
    <div className="h-fit py-16 flex">
      <Sidebar categories={categories} setProducts={setProducts} />

      <div className="h-fit w-5/6 py-4 border-l-2 border-[var(--gray)] grid grid-cols-4 place-items-center gap-y-24">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCardCarrousel key={product.id} product={product} />
            ))
          : products &&
            products.map((product) => (
              <ProductCardCarrousel key={product.id} product={product} />
            ))}
      </div>
    </div>
  )
}