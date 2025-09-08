import React, { useEffect } from 'react';
import { cartStore } from '../store/cartStore';
import { Loader2 } from 'lucide-react';
import { axiosInstance } from '../utils/axiosInstance';
import { authStore } from '../store/authStore';
import axios from 'axios';

const Checkout = () => {
  const {
    fetchCartItems,
    cartItems,
    isLoading
  } = cartStore();
  const userData = JSON.parse(localStorage.getItem("user-storage"))
  console.log("hello", userData)
  

  

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subTotalAmount = cartItems.reduce(
    (acc, elem) => acc + elem.product.price * elem.quantity,
    0                           
  )

  

  const orderList = cartItems.map((elem) => ({
    productId: elem.productId,
    inventoryId: elem.inventoryId,
    name: elem.product.name,
    price: elem.product.price,
    quantity: elem.quantity,
    size: elem.inventory.size,
  }))
  

 

  const handleRazorPayCheckout = async ({ amount, items}) => {
    const res = await axiosInstance.post("/payements/create-order", {amount, items});
    const { order } = res.data;
    const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Amiore",
    description: "Order payment",
    order_id: order.id,
    prefill: { name: user.username, email: user.email},
    handler: async (response) => {
      // 3) Quick verify for UI
      // await fetch(`${import.meta.env.VITE_API_BASE}/api/payments/verify`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: response,
      // });
      
      const res = await axiosInstance.post("/payments/verify",response)
    },
    modal: { ondismiss: () => console.log("Checkout closed") },
    theme: { color: "#111827" },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
  }

  if(isLoading){
    return(
      <div className='h-screen flex justify-center items-center'><Loader2 className='animate-spin'></Loader2></div>
    )
  }






  return (
    <div className="container mx-auto mt-10">
      {console.log(cartItems)}
      <h1 className="text-3xl font-bold mb-5">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-5">Billing Details</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-5">Your Order</h2>
          <div className="border-2 border-neutral-200 bg-neutral-100 rounded-md p-5 divide-y divide-neutral-300">
            {cartItems.map((elem) => (
              <div key={elem.id} className="flex justify-between mb-2 px-4">
              <span className='flex gap-x-16'>
                <img className=' relative aspect-auto w-[70px] h-[80px]' src={elem.product.mainImage} />
                <div className='bg-neutral-200 text-neutral-400 font-medium text-sm rounded-[100%] w-5 h-5 flex justify-center items-center  absolute'>{elem.quantity}</div>
                <div>
                <div className='font-medium tracking-tight'>{elem.product.name}</div>
                <div className='text-neutral-400'>{elem.inventory.size}</div>
              </div>
              </span>
              
              <span className='font-medium'>₹{elem.product.price * elem.quantity}</span>
            </div>
            ))}

            <div className="flex justify-between font-bold py-4">
              <span>Total</span>
              <span>{subTotalAmount}</span>
            </div>
            <button className="w-full bg-neutral-900 text-white font-medium text-xl py-3 rounded-md mt-10 hover:bg-neutral-950 cursor-pointer" onClick={() => handleRazorPayCheckout({ amount: subTotalAmount, items: orderList })}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
