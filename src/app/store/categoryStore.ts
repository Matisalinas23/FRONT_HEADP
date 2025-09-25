import { ICategory } from "../type/category";
import { create } from "zustand";

interface stateCategory {
    category: ICategory | null
    categories: ICategory[] | []
    setCategories: (categories: ICategory[] | []) => void
    setCategory: (category: ICategory | null) => void
}

const categoryStore = create<stateCategory>((set) => ({
    category: null,
    categories: [],
    setCategories: (newCategorie: ICategory[] | []) => (set(() => ({ categories: newCategorie }))),
    setCategory: (newCategory: ICategory | null) => (set(() => ({ category: newCategory }))),
}))

export default categoryStore