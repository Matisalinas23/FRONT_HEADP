import { IProduct } from "../type/product";
import { create } from "zustand";

interface productState {
    products: IProduct[] | []
    product: IProduct | null
    setProducts: (products: IProduct[] | []) => void
    setProduct: (product: IProduct | null) => void
}

const productStore = create<productState>((set) => ({
    products: [],
    product: null,
    setProducts: (newProducts: IProduct[] | []) => set(() => ({ products: newProducts })),
    setProduct: (newProduct: IProduct | null) => set(() => ({ product: newProduct}))
}))

export default productStore