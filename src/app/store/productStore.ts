import { IProduct } from "../type/product";
import { create } from "zustand";

interface productState {
    products: IProduct[] | []
    activeProduct: IProduct | null
    setProducts: (products: IProduct[] | []) => void
    setActiveProduct: (product: IProduct | null) => void
}

const productStore = create<productState>((set) => ({
    products: [],
    activeProduct: null,
    setProducts: (newProducts: IProduct[] | []) => set(() => ({ products: newProducts })),
    setActiveProduct: (newProduct: IProduct | null) => set(() => ({ activeProduct: newProduct}))
}))

export default productStore