import React, { useState } from 'react'
import { motion } from "motion/react"
import { Loader2, X } from "lucide-react"
import toast from 'react-hot-toast';
import { cartStore } from '../store/cartStore';
import { authStore } from '../store/authStore';

function SideModalComponent({setSideModalOpen, product}) {
    const [selectedSize, setSelectedSize] = useState(null);
    const { addProduct, isLoading, setCartModalOpen } = cartStore();
    const {authState, setAuthModalOpen} = authStore();
    // const availableSizes = product.inventory.map((elem) => elem.size);
  return (
    <div className='fixed inset-0 flex h-full w-full items-center justify-center bg-black/50'>
        <motion.div
        initial={{
            opacity: 0,
            scale: 0.8,
            filter : `blur(4px)`,
            width: 0,
            height: "100vh"
        }}
        animate={{
            opacity: 1,
            scale: 1,
            filter : `blur(0px)`,
            width: "50%"
        }}
        exit={{
            opacity: 0,
            scale: 0.8,
            filter : `blur(4px)`,
            width: 0,
            height: "100vh"
        }}
        
    
        
         className='absolute min-h-screen w-[50%] right-0  px-8 py-10 bg-white'>
            {console.log(product)}
            <div><X className='cursor-pointer' onClick={() => setSideModalOpen(false)}  size={24}/></div>
            <div className='flex flex-col gap-24 h-[80%] mt-16'>
                <div className='flex'>
                <span><img src={product.mainImage} alt="" height={"100px"} width={"80px"}/></span>
                <span className='flex flex-col justify-evenly gap-7 px-5 py-3'>
                    <div className='font-bold'>{product.name}</div>
                    <div>₹{product.price}</div>
                </span>
                </div>

                <div>
                    <div>Select a size</div>
                    <ul>
                        {product.inventory.map((elem) => (<li className={`py-2 px-3 cursor-pointer hover:bg-neutral-100 rounded-md ${selectedSize === elem.id ? "bg-neutral-100" : ""}`} key={elem.id} onClick={() => setSelectedSize(elem.id)}>{elem.size}</li>))}
                    </ul>
                </div>

                <button className='bg-black text-white py-3 rounded-md flex justify-center cursor-pointer'
                onClick={async () => {
                    if(!selectedSize){
                        toast.error("Select a size")
                    }else if(authState !== "authenticated"){
                        await setAuthModalOpen(true);
                    }
                    else{
                        try {
                            const data = {
                                productId: product.id,
                                inventoryId: selectedSize
                            }
                            console.log("size data", data);
                            await addProduct(data);
                            setSideModalOpen(false);
                            await setCartModalOpen(true);
                        } catch (error) {
                            throw new Error("Failed to add product to cart");
                        }
                    }
                }}
                >{isLoading ? <Loader2 className='animate-spin'/> : "Add to cart"}</button>

            </div>
        </motion.div>
    </div>
  )
}

export default SideModalComponent