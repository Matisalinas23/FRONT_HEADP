import { FormikProps, useFormik } from "formik"
import { IProduct } from "../../type/product"
import * as Yup from 'yup'
import CancelButton from "../CancelButton"
import AcceptButton from "../AcceptButton"
import { updateCategoriesHttp, updateImageProductHttp, updateProductHttp } from "@/app/http/productsHttp"
import ImageSelector from "../ImageSelector"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ICategory } from "@/app/type/category"
import { getCategoriesHttp } from "@/app/http/categoriesHttp"
import CatList from "../CategoryList"
import { IFormValues } from "./ModalCreateProduct"

type ModalUpdateProductProps = {
    product: IProduct
    setUpdateProduct: (el: boolean) => void
    getProducts: () => void
}

export default function ModalUpdateProduct({ product, setUpdateProduct, getProducts }: ModalUpdateProductProps) {
  const [categories, setCategories] = useState<ICategory[]>([])

  async function getCategories() {
    const data = await getCategoriesHttp()

    if (data) {
      setCategories(data) 
    } else {
      console.log("There was a problem with the categories: ", data)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    initialValues: {
      name: product.name,
      stock: product.stock,
      price: product.price,
      description: product.description,
      image: null,
      categories: product.categories.map(c => c.id!) || []
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      stock: Yup.number().required('El stock es obligatorio').min(0, 'El stock no puede ser negativo'),
      price: Yup.number().required('El precio es obligatorio').min(0, 'El precio no puede ser negativo'),
      description: Yup.string().required('La descripcion es obligatoria'),
    }),
    onSubmit: async (values) => {
      const productValues: Partial<IProduct> = {
        name: values.name,
        stock: Number(values.stock),
        price: Number(values.price),
        description: values.description,
      }

      if (productValues.name !== product.name ||
        productValues.stock !== product.stock ||
        productValues.price !== product.price ||
        productValues.description !== product.description
      ) {
        const success = await updateProductHttp(productValues, product.id)

        if (!success) {
          alert('Error al actualizar el producto')
          return;
        }
      } else {
        console.log("Product values are the same (☞ﾟヮﾟ)☞")
      }

      const myCategories: ICategory[] = [] // save categories that are selected in the form

      // compares categoriesd id saved with real categories in 'myCategories'
      values.categories.forEach(cat => {
        const foundCategory = categories.find(c => c.id === cat)
        if (foundCategory) {
          myCategories.push(foundCategory)
        } else {
          console.log("myCategories: ", myCategories)
        }
      })

      if (myCategories !== product.categories) {
        const categorySuccess = await updateCategoriesHttp(myCategories, product.id)

        if (!categorySuccess) {
          alert('Error al actualizar las categorias del producto')
          return
        }
      } else {
        console.log("Categories are the same (☞ﾟヮﾟ)☞")
      }

      if (values.image && values.image.name !== product.image?.name) {
        const formData = new FormData()
        formData.append('image', values.image)
        const successImage = await updateImageProductHttp(formData, product.id)

        if (!successImage) {
          alert('Error al actualizar la imagen del producto')
          return
        }
      } else {
        console.log("Image is the same (☞ﾟヮﾟ)☞")
      }

      getProducts()
      setUpdateProduct(false)
    }
  })

  return (
    <form className="w-200 h-126 absolute top-30 left-1/2 -translate-x-1/2 bg-[var(--darkgray)] py-8 px-12 flex flex-col justify-between"
      onSubmit={formik.handleSubmit}
    >
      <h3 className="w-full text-2xl mb-4 font-semibold flex justify-center">
        Actualizar Producto
      </h3>

      <div className="flex gap-6 w-full mb-8">
        <div className="w-1/2 flex flex-col justify-center">
          <h3 className="w-full text-center mb-4 font-medium text-xl">Rellena los Datos</h3>
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange}
          className="mb-5 py-1 px-2 w-full bg-[var(--lightgray)]"
          />
          <input type="text" name="price" value={formik.values.price} onChange={formik.handleChange}
            className="mb-5 py-1 px-2 w-full bg-[var(--lightgray)]"
          />
          <input type="text" name="stock" value={formik.values.stock} onChange={formik.handleChange}
            className="mb-5 py-1 px-2 w-full bg-[var(--lightgray)]"
          />
          <div className="p-2 w-full h-24  bg-[var(--lightgray)]">
            <textarea name="description" value={formik.values.description}
            onChange={formik.handleChange}className="w-full h-full"/>
          </div>
        </div>

        <div className="h-full w-0 border-1 text-[var(--lightgray)]"></div>

        <div className="w-1/4 flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <p className="mb-2">Imagen Anterior</p>
            {product.image && <Image src={product.image.url} alt={product.name} width={100} height={100} className=" object-cover mb-4"/>}
          </div>
          <div className="flex flex-col items-center ">
            <p className="mb-2">Nueva Imagen</p>
            <ImageSelector formik={formik} />
          </div>
        </div>

        <div className="border-1 h-full w-0 text-[var(--lightgray)] flex flex-col"></div>
        
        <CatList categories={categories} formik={formik} />
      </div>

      <div className="w-full flex justify-between">
        <CancelButton openModal={setUpdateProduct} />
        <AcceptButton type="submit"/>
      </div>
    </form>
  )
}
