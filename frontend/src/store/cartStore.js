import { create } from "zustand"
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-hot-toast"; 


export const cartStore = create((set) => ({
    cartItems: [],
    isLoading: false,
    isUpadatingQuantity: false,
    isUpdatingId: null,
    cartModalOpen: false,
    setCartModalOpen: (value) => set({ cartModalOpen: value }),

    fetchCartItems: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/cart/get-all-cartItems");
            set({ cartItems: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch cart items");
            throw new Error("Failed to fetch cart items");
        } finally {
            set({ isLoading: false });
        }
    },

    addProduct: async (data) => {
        set({ isLoading: true });
        try {
            await axiosInstance.get(`/cart/add-to-cart?productId=${data.productId}&inventoryId=${data.inventoryId}`);
            toast.success("Product added to cart");
            // Refresh cart items
            await cartStore.getState().fetchCartItems();
        } catch (error) {
            toast.error("Product not added");
        } finally {
            set({ isLoading: false });
        }
    },

    removeProduct: async (inventoryId) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/cart/remove-from-cart/${inventoryId}`);
            toast.success("Product removed from cart");
            await cartStore.getState().fetchCartItems();
        } catch (error) {
            toast.error("Failed to remove product");
            throw new Error("Failed to remove product");
        } finally {
            set({ isLoading: false });
        }
    },

    decrementQuantity: async (inventoryId) => {
        set({ isUpadatingQuantity: true });
        set({ isUpdatingId: inventoryId });
        try {
            await axiosInstance.get(`/cart/decrement-quantity/${inventoryId}`);
            toast.success("Product quantity updated");
            const res = await axiosInstance.get("/cart/get-all-cartItems");
            set({ cartItems: res.data.data });
        } catch (error) {
            toast.error("Failed to update quantity");
        } finally {
            set({ isUpadatingQuantity: false });
            set({ isUpdatingId: null });
        }
    },
    incrementQuantity: async (inventoryId) => {
        set({ isUpadatingQuantity: true });
        set({ isUpdatingId: inventoryId });
        try {
            await axiosInstance.get(`/cart/increment-quantity/${inventoryId}`);
            toast.success("Product quantity updated");
            const res = await axiosInstance.get("/cart/get-all-cartItems");
            set({ cartItems: res.data.data });
        } catch (error) {
            toast.error("Failed to update quantity");
        } finally {
            set({ isUpadatingQuantity: false });
            set({ isUpdatingId: null });
        }
    },
}));