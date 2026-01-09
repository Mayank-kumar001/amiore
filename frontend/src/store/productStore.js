import {create} from "zustand"
import { axiosInstance } from "../utils/axiosInstance"
import toast from "react-hot-toast"

export const productStore  = create((set,get) => ({
    allProducts: [],
    productSubCategory:[],
    isFetchingAllProducts: false,
    isFetchingProductDetails: false,
    isCreatingProduct: false,
    currentProduct: null,
    stocks:[],
    updateStocks: (stocks) => set({stocks}),
    getProductsByCategoryId : async(categoryId) => {
        try {
            set({isFetchingAllProducts: true})
            const res = await axiosInstance.get(`product/get-productByCategoryId/${categoryId}`)
            console.log("helloworld",res.data.data);
            set({allProducts: res.data.data})
            const subCategory = res.data.data.map((product) => product.tag).filter((tag, index, arr) => arr.indexOf(tag) === index);
            set({productSubCategory: subCategory})
            toast.success("products fetched successfully")
        } catch (error) {
            toast.error(`something went wrong while fetching the products`);
            console.log(error);
            throw new Error(error.message)
        }
        finally{
            set({isFetchingAllProducts: false})
        }
    },
    getProductsByParentId : async(parentId) => {
        try {
            set({isFetchingAllProducts: true})
            const res = await axiosInstance.get(`product/get-productByparentId/${parentId}`)
            console.log("helloworld",res.data.data);
            set({allProducts: res.data.data})
            const subCategory = res.data.data.map((product) => product.category.name).filter((tag, index, arr) => arr.indexOf(tag) === index);
            set({productSubCategory: subCategory})
            toast.success("products fetched successfully")
        } catch (error) {
            toast.error(`something went wrong while fetching the products`);
            console.log(error);
            throw new Error(error.message)
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
    },
    createProduct: async(data) => {
        try {
            set({isCreatingProduct: true})
            const response = await axiosInstance.post("/product/create-product", data);
            console.log(response.data.data);
            toast.success("product created successfully")

        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data.message}`);
        }finally{
            set({isCreatingProduct: false})
        }
    }
}))