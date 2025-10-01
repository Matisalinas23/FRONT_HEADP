import AcceptButton from "../AcceptButton";
import CancelButton from "../CancelButton";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup"
import { ICategory } from "../../type/category";
import { createProductHttp } from "../../http/productsHttp";
import ImageSelector from "../ImageSelector";
import CategoryList from "../CategoryList";

type CreateProductProps = {
  openModal: (el: boolean) => void
  categories: ICategory[]
  getProducts: () => void
}

export interface IFormValues {
  name: string
  description: string
  price: number
  stock: number
  categories: number[]
  image: File | null
}

export default function ModalCreateProduct({ openModal, categories, getProducts }: CreateProductProps) {

  const inputStyle = "bg-[var(--lightgray)] pl-2 h-7"

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    initialValues: {
        name: "",
        description: "",
        price: 0,
        stock: 1,
        categories: [],
        image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(40, '40 caracteres máximos')
    }),
    onSubmit: async (values) => {
      if (!values.image || categories.length === 0) { // Image can not be 'null'
        alert("La imagen no ha sido subida, vuelve a intentarlo o intenta con otra imagen")
        return;
      }

      const myCategories: ICategory[] = [] // save categories that are selected in the form

      // compares categoriesd id saved with real categories in 'myCategories'
      values.categories.forEach(cat => {
        const foundCategory = categories.find(c => c.id === cat)
        if (foundCategory) {
          myCategories.push({name: foundCategory.name})
        }
      })

      const formData = new FormData()

      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("price", String(values.price))
      formData.append("stock", String(values.stock))
      formData.append("categories", JSON.stringify(myCategories))
      formData.append("image", values.image)
      
      const success = await createProductHttp(formData)
      console.log(success)

      if (!success) {
        alert("No se pudo crear el producto, intentalo mas tarde")
        return;
      }

      getProducts()
      openModal(false)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="bg-[var(--darkgray)] p-12 absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
      <h3 className="text-2xl font-semibold mb-2">Crear Producto</h3>

      <div className="flex mb-4"> {/* Form content box */}
        <div className="w-80 flex flex-col gap-6 pr-4 mr-8"> { /* Left half of form */ }
          <input
          type="text" value={formik.values.name} onChange={formik.handleChange} placeholder="Nombre del producto"
          className={inputStyle} name="name"
          />
          <input
          type="text" value={formik.values.price} onChange={formik.handleChange} placeholder="Precio del producto"
          className={inputStyle} name="price"
          />
          <input
          type="text" value={formik.values.stock} onChange={formik.handleChange} placeholder="Cantidad de stock del producto"
          className={inputStyle} name="stock"
          />
          <div className="w-full p-1 pr-2 bg-[var(--lightgray)] mt-2">
            <textarea value={formik.values.description} onChange={formik.handleChange} placeholder="Descripción del producto"
            className="w-full h-30 pl-2 pr-1" name="description"
            />
          </div> { /* Textarea for description of product */ }
        </div> { /* Left half of form */ }

        <div className="w-48 flex flex-col gap-8">
          <CategoryList categories={categories} formik={formik}/>
          <ImageSelector formik={formik}/>
        </div> {/* Right half of form */}
      </div> {/* Form content box */}

      <div className="w-full flex justify-between">
        <CancelButton openModal={openModal}/>
        <AcceptButton type="submit"/>
      </div>
    </form>
  )
}
