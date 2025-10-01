import { getProductByIdHttp, getProductHttp, getProductsHttp } from "../http/productsHttp";
import { IProduct } from "../type/product";
import productStore from "../store/productStore";
import { useShallow } from "zustand/shallow";


type ProductParam = { id: number; name?: never } | { id?: never; name: string };

export function useProducts() {

    const { setProducts, setProduct } = productStore(useShallow((state) => ({
        setProducts: state.setProducts,
        setProduct: state.setProduct
    })))

    async function getProducts(): Promise<void> {
        const myProducts: IProduct[] | undefined = await getProductsHttp()

        if (!myProducts) {
            console.log("Error 'getProducts' in useProducts.ts")
            return;
        }
        
        setProducts(myProducts)
    }
    

    async function getProduct(param: ProductParam): Promise<void> {
        const myProduct: IProduct | undefined = await getProductHttp(param.id, param.name)

        if (!myProduct) {
            console.log("Error 'getProduct' in useProducts.ts: product not found")
            return;
        }

        setProduct(myProduct)
    }

    async function getProductById(productId: string): Promise<void> {
        const myProduct: IProduct | undefined = await getProductByIdHttp(productId)

        if (!myProduct) {
            console.log("Error 'getProductById' in useProducts.ts: product not found")
            return;
        }

        setProduct(myProduct)
    }

    return {
        getProducts,
        getProduct,
        getProductById
    }
}