'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import useCategories from '../hooks/useCategories'
import { IProduct } from '../type/product'
import categoryStore from '../store/categoryStore'
import { getProductsByCategoriesHttp, getProductsByPriceRangeHttp } from '../http/productsHttp'
import { ICategory } from '../type/category'


type SidebarProps = {
  setProducts: (products: IProduct[] | []) => void
}

export default function Sidebar({ setProducts }: SidebarProps) {
  const [checkedCategoryIds, setCheckedCategoryIds] = useState<number[]>([])

  const searchParams = useSearchParams()
  const { getCategories } = useCategories()
  const categoryParam = searchParams.get('category')

  const categories = categoryStore((state) => state.categories)

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (categoryParam && categories.length > 0) {
      const category = categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase())

      if (category) {
        setCheckedCategoryIds([category.id!])
        getProductsByCategoriesHttp([category.id!]).then(filtered => {
          if (filtered) setProducts(filtered)
        })
      }
    }
  }, [categoryParam, categories])

  // 🖱️ 3️⃣ Checkbox handler
  async function handleCheck(e: ChangeEvent<HTMLInputElement>, categoryId: number) {
    const isChecked = e.target.checked
    const newChecked = isChecked
      ? [...checkedCategoryIds, categoryId]
      : checkedCategoryIds.filter(cid => cid !== categoryId)

    setCheckedCategoryIds(newChecked)

    const filteredProducts: IProduct[] | undefined = await getProductsByCategoriesHttp(newChecked)
    if (!filteredProducts) return

    setProducts(filteredProducts)
  }

  // 💰 4️⃣ Filtro por precio (igual que antes)
  const formik = useFormik({
    initialValues: {
      minPrice: "",
      maxPrice: ""
    },
    onSubmit: async (values) => {
      const filteredProducts = await getProductsByPriceRangeHttp(values.minPrice, values.maxPrice)
      if (filteredProducts) setProducts(filteredProducts)
    }
  })

  // 🧱 5️⃣ Render
  return (
    <div className='h-full w-80 px-12 pt-4 bg-[var(--background)] flex flex-col items-center'>
      <div className='border-b-2 w-full pb-6 border-[var(--gray)] flex flex-col items-center'>
        <h3 className='text-xl font-light w-fit mb-6'>Filtrar por categorías</h3>

        <div className='flex flex-col'>
          {categories.map((category: ICategory) => (
            <label
              key={category.id}
              className='text-lg font-light mb-1 flex flex-row items-center cursor-pointer duration-150 hover:scale-110'
            >
              <input
                type="checkbox"
                checked={checkedCategoryIds.includes(category.id!)}
                onChange={(e) => handleCheck(e, category.id!)}
                className='appearance-none rounded-full w-3 h-3 mr-2 bg-[var(--gray)] checked:bg-[var(--darkgreen)] cursor-pointer'
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className='w-full border-b-2 border-[var(--gray)] py-8 flex flex-col items-center gap-4'
      >
        <h3 className='text-xl font-light w-fit mb-4'>Filtrar por precio</h3>
        <div className='max-w-full font-light text-lg flex gap-2'>
          <input
            type="text"
            name='minPrice'
            value={formik.values.minPrice}
            onChange={formik.handleChange}
            className='text-base w-full text-center bg-[var(--gray)] px-1'
          />
          -
          <input
            type="text"
            name='maxPrice'
            value={formik.values.maxPrice}
            onChange={formik.handleChange}
            className='text-base w-full text-center bg-[var(--gray)] px-1'
          />
        </div>
        <button
          type='submit'
          className='w-full font-light py-1 bg-[var(--darkgray)] duration-200 hover:scale-105'
        >
          Aceptar
        </button>
      </form>
    </div>
  )
}
