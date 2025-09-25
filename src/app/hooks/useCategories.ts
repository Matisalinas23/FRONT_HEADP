import React from 'react'
import { getCategoriesHttp } from '../http/categoriesHttp'
import { ICategory } from '../type/category'
import categoryStore from '../store/categoryStore'
import { useShallow } from 'zustand/shallow'

export default function useCategories() {

  const { setCategories } = categoryStore(useShallow((state) => ({
    setCategories: state.setCategories
  })))

  async function getCategories() {
    try {
        const myCategories: ICategory[] | undefined = await getCategoriesHttp()

        if (!myCategories) {
            console.log("There is a problem in 'getCategories' from 'useCategories.ts'.")
            console.log("My categories: ", myCategories)
            return;
        }
        
        setCategories(myCategories)
    } catch (error) {
        console.log("Error in 'getCategories' from 'useCategories.ts' ", error)
    }
  }

  return {
    getCategories
  }
}
