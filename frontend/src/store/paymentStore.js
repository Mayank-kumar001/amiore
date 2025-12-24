import {create} from "zustand"
import { axiosInstance } from "../utils/axiosInstance"
import { toast } from "react-hot-toast"; 


export const PaymentStore = create((set) => ({
    fetchingOrderDetails: false,
    orderDetails: null,
    pendingOrders: [],

    getOrderDetails: async(orderId) => {
        try {
            set({fetchingOrderDetails: true})

            const res = await axiosInstance.get(`/payments/orderSuccessful?orderId=${orderId}`);

            set({orderDetails: res.data.data})
            toast.success("Order successful")

        } catch (error) {
            toast.error(`something went wrong while fetching order details`);
            console.log(error);
            throw new Error("error in fetching order details")
        }finally{
            set({fetchingOrderDetails: false})
        }
    },
    // getAllPendingOrders: async() => {
    //    try {
    //      const res = await axiosInstance.get("/pendingOrder")
    //      set({pendingOrders: res.data.data})
    //      toast.success("Order successful")
    //    } catch (error) {
    //     toast.error(`something went wrong while fetching pending order details`);
    //         console.log(error);
    //         throw new Error("error in fetching pending order details")
    //    }
    // }
}))