"use client"

import React, { useEffect, useState } from 'react'
import useCategories from '../hooks/useCategories'
import productStore from '../store/productStore'
import { useShallow } from 'zustand/shallow'
import categoryStore from '../store/categoryStore'
import { useProducts } from '../hooks/useProducts'
import ProductCardCarrousel from '../components/ProductCardCarrousel'
import Sidebar from '../components/Sidebar'
import { useSearchParams } from 'next/navigation'

export default function ProductPage() {
  // stores (global states)
  const { products, setProducts } = productStore(useShallow((state) => ({
    products: state.products,
    setProducts: state.setProducts,
  })))

  const { categories, setCategories } = categoryStore(useShallow((state) => ({
    categories: state.categories,
    setCategories: state.setCategories,
  })))

  // hooks
  const { getCategories } = useCategories()
  const { getProducts } = useProducts()

  useEffect(() => {
    getCategories()
    getProducts()
  }, [])

  // SearchProduct
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || '' // Obtains value of search query from the url of the page

  console.log("search value: ", search)

  const filteredProducts = products.filter(product => { // Filter products coicidents with search param
    const searchWords = search.toLowerCase().split(/\s+/)
    const productWords = product.name.toLowerCase().split(/\s+/)

    return searchWords.every(word =>
      productWords.some(pw => pw.includes(word))
    )
  })

  console.log('filtered products: ', filteredProducts)

  return (
    <div className='h-fit py-16 flex'>
      <Sidebar categories={categories} setProducts={setProducts} products={products}/>

      <div className='h-fit w-5/6 py-4 border-l-2 border-[var(--gray)] grid grid-cols-4 place-items-center gap-y-24'>
        {filteredProducts.length > 0
        ? filteredProducts.map((product) => (
          <ProductCardCarrousel key={product.id} product={product}/>
        ))
        : products && products.map((product) => (
          <ProductCardCarrousel key={product.id} product={product}/>
        ))}
      </div>
    </div>
  )
}
