import React, { useState } from 'react';
import { useEffect } from 'react';
import { PaymentStore } from '../store/paymentStore';
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"

const OrderSuccessful = () => {

  const { fetchingOrderDetails, orderDetails, getOrderDetails } = PaymentStore();
  const { orderId } = useParams();
  console.log(orderId)
  useEffect(() => {
    console.log("hello world1")
    getOrderDetails(orderId)



  }, [orderId])
  console.log("hello world2")

  if (!orderDetails) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  return (
    <div className="flex flex-col mt-16 items-center md:flex-row font-sans p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex-1 md:pr-10 mb-8 md:mb-0">
        <h1 className="font-bold text-4xl md:text-6xl mb-2">THANK YOU!</h1>
        <h2 className="font-normal text-lg md:text-xl mb-10 md:mb-12 text-gray-600">Your order was successfully placed.</h2>
        {console.log(orderDetails)}

        <div className="mb-8">
          <p className="font-bold mb-1">YOUR ORDER NUMBER</p>
          <p className="text-gray-600">{orderDetails.id}</p>
        </div>


        <div className="mb-8">
          <p className="font-bold mb-1">ORDER DATE & TIME</p>
          <p className="text-gray-600">{new Date(orderDetails.date).toLocaleString()}</p>
        </div>

        <div>
          <p className="font-bold mb-1">YOUR DETAILS</p>
          <p className="text-gray-600">{orderDetails.userDetails.username}</p>
          <p className="text-gray-600">{orderDetails.userDetails.email}</p>
        </div>
      </div>

      <div className="flex-1 md:pl-10 md:border-l border-t md:border-t-0 border-gray-200 pt-8 md:pt-0 flex flex-col justify-center">
        <div className="text-lg">
          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Order Value</span>
            <span>₹{(orderDetails.amount/100) - 149}</span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="text-gray-600">Delivery Fee</span>
            <span>₹149</span>
          </div>
          <hr className="border-0 border-t border-gray-200 my-5" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹{(orderDetails.amount/100)}</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default OrderSuccessful;



