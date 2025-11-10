import { getProductsHttp } from "../http/productsHttp";
import { IProduct } from "../type/product";
import productStore from "../store/productStore";
import { useShallow } from "zustand/shallow";

export function useProducts() {

    const { setProducts, setActiveProduct } = productStore(useShallow((state) => ({
        setProducts: state.setProducts,
        setActiveProduct: state.setActiveProduct
    })))

    async function getProducts(): Promise<void> {
        const myProducts: IProduct[] | undefined = await getProductsHttp()

        if (!myProducts) {
            console.log("Error 'getProducts' in useProducts.ts")
            return;
        }
        
        setProducts(myProducts)
    }

    return {
        getProducts,
    }
}