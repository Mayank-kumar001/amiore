import {create} from "zustand"
import { axiosInstance } from "../utils/axiosInstance"
import toast from "react-hot-toast"

export const productStore  = create((set,get) => ({
    allProducts: [],
    isFetchingAllProducts: false,
    isFetchingProductDetails: false,
    currentProduct: null,
    getProductsByCategoryId : async(categoryId) => {
        try {
            set({isFetchingAllProducts: true})
            const res = await axiosInstance.get(`product/get-productByCategoryId/${categoryId}`)
            console.log("helloworld",res.data.data);
            set({allProducts: res.data.data})
            toast.success("products fetched successfully")
        } catch (error) {
            toast.error(`something went wrong while fetching the products`);
            throw new Error("error in fetching products")
        }
        finally{
            set({isFetchingAllProducts: false})
        }
    },
    getProductByProductId : async(productId) => {
        try {
            set({isFetchingProductDetails: true})
            const res = await axiosInstance.get(`product/get-productById/${productId}`)
            console.log("helloworld",res.data.data);
            set({currentProduct: res.data.data})
            toast.success("product fetched successfully")
        } catch (error) {
            toast.error(`something went wrong while fetching the product`);
            throw new Error("error in fetching product")
        }
        finally{
            set({isFetchingProductDetails: false})
        }
    }
}))