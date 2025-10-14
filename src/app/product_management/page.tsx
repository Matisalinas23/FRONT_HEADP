"use client"

import { useEffect, useState } from "react"
import { IProduct } from "../type/product"
import { getProductsHttp } from "../http/productsHttp"
import ModalCreateCategory from "../components/Modals/ModalCreateCategory"
import { ICategory } from "../type/category"
import { getCategoriesHttp } from "../http/categoriesHttp"
import ModalDeleteCategory from "../components/Modals/ModalDeleteCategory"
import Product from "../components/Product"
import ModalCreateProduct from "../components/Modals/ModalCreateProduct"
import NoAdminScreen from "../components/NoAdminScreen"
import Loading from "../components/Loading/Loading"

export default function ProductManagement() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [openCreateCategory, setOpenCreateCategory] = useState<boolean>(false)
  const [modalDeleteCategory, setModalDeleteCategory] = useState<boolean>(false)
  const [modalCreateProduct, setModalCreateProduct] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)

  const getProducts = async () => {
    const products = await getProductsHttp()

    if (!products) {
      console.log("Problem fetching products in product management screen")
      return;
    }

    setProducts(products)
  }

  const getCategories = async () => {
    const categories = await getCategoriesHttp()

    if (!categories) {
      console.log("Problem fetching categories in product management screen")
      return;
    }

    setCategories(categories)
  }

  useEffect(() => {
    setIsClient(true)
    getProducts()
    getCategories()
  }, [])

  if (isClient && !localStorage.getItem('token') && !localStorage.getItem('logedUser')) {
    return (<NoAdminScreen />)
  }

  if (categories.length === 0 || products.length === 0) {
    return (
      <div className='h-[80vh]'>
        <Loading />
      </div>
    )
  }

  return (
    <div className="py-16 flex justify-center gap-12">
      <div className="w-54">

        {/* Category List */}
        <div className="min-h-60 h-fit w-full max-h-132 overflow-y-auto bg-[var(--darkgray)] px-4 flex flex-col">
          <div className="border-b-2 border-[var(--lightgray)] flex justify-center">
            <h3 className="py-3 px-4 text-sm font-light">Filtrar por categorias</h3>
          </div>
          <div className="py-3 px-4 flex flex-col">
            {categories && categories.map(c => (<p key={c.id} className="py-1 text-sm">{c.name}</p>))}
          </div>
        </div>

        <button
          className="bg-[var(--darkgreen)] w-full mt-4 py-1 font-normal hover:bg-[var(--green)] hover:font-semibold"
          onClick={() => setOpenCreateCategory(true)}
        >
          Crear Categoria
        </button>

        <button
          className="bg-[var(--red)] w-full mt-4 py-1 font-normal hover:bg-[var(--lightred)] hover:font-semibold"
          onClick={() => setModalDeleteCategory(true)}
        >
          Eliminar Categoria
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col">
        <div className="min-h-60 pr-4 max-h-126 mb-6 overflow-y-auto flex flex-col gap-4">
          {products && products.map(p => <Product key={p.id} product={p} getProducts={getProducts}/>)}
        </div>

        <button
        className="py-2 text-lg mr-4 font-normal bg-[var(--darkgreen)] hover:bg-[var(--green)] hover:font-semibold"
        onClick={() => setModalCreateProduct(true)}
        >
          Añadir Producto
        </button>
      </div>
      {openCreateCategory && !modalDeleteCategory && !modalCreateProduct &&
        <div className="fixed inset-0 h-screen w-screen bg-[var(--background)]/50">
          <ModalCreateCategory openModal={setOpenCreateCategory} getCategories={getCategories} />
        </div>
      }
      {modalDeleteCategory && !openCreateCategory && !modalCreateProduct &&
        <div className="fixed inset-0 h-screen w-screen bg-[var(--background)]/50">
          <ModalDeleteCategory openModal={setModalDeleteCategory} categories={categories} getCategories={getCategories} />
        </div>
      }
      {modalCreateProduct && !openCreateCategory && !modalDeleteCategory &&
        <div className="fixed inset-0 h-screen w-screen bg-[var(--background)]/50">
          <ModalCreateProduct openModal={setModalCreateProduct} categories={categories} getProducts={getProducts}/>
        </div>
      }
    </div>
  )
}
