import { deleteCategoryHttp } from "../../http/categoriesHttp"
import { ICategory } from "../../type/category"
import AcceptButton from "../AcceptButton"
import CancelButton from "../CancelButton"
import { useFormik } from "formik"

type DeleteCategoryProps = {
    openModal: (el: boolean) => void
    categories: ICategory[]
    getCategories: () => void
}

export default function ModalDeleteCategory({ openModal, categories, getCategories }: DeleteCategoryProps) {

  const formik = useFormik({
    initialValues: {
      categoryName: ""
    },
    onSubmit: async(values) => {
      if (!categories) {
        alert("No hay categorias disponibles")
        return;
      }
      const category = categories.find(c=>c.name === values.categoryName)
      if (!category) {
        alert("No se encontro la categoria")
        return;
      }

      await deleteCategoryHttp(category.id!)
      getCategories() // Reload categories list
      openModal(false)
    }
  })

  return (
    <form
    className="absolute top-40 left-1/2 -translate-x-1/2 w-90 bg-[var(--darkgray)] px-12 py-8 flex flex-col gap-8 items-center"
    onSubmit={formik.handleSubmit}
    >
      <h3>Eliminar Categoría</h3>
      <input
      className="w-full h-8 bg-[var(--lightgray)] pl-2 mb-4" type="text" placeholder="Nombre de la categoria"
      name="categoryName" value={formik.values.categoryName} onChange={formik.handleChange}
      />

      <div className="w-full flex justify-between">
        <CancelButton openModal={openModal} />
        <AcceptButton type="submit"/>
      </div>
    </form>
  )
}
