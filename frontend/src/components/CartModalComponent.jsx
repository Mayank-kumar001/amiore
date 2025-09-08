import { Loader2, Minus, Plus, X } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { cartStore } from "../store/cartStore";

function CartModalComponent({ modalOpen, setModalOpen }) {
  const {
    fetchCartItems,
    cartItems,
    isLoading,
    decrementQuantity,
    incrementQuantity,
    isUpadatingQuantity,
    isUpdatingId
  } = cartStore();

  const subTotalAmount = cartItems.reduce(
    (acc, elem) => acc + elem.product.price * elem.quantity,
    0                           
  )
  
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: `blur(0px)`,
          width: "50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        className="absolute right-0 h-full min-h-screen w-[50%] bg-white px-4 py-6 flex flex-col gap-6"
      >
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-10">
              
              <X
                className="cursor-pointer"
                onClick={() => setModalOpen(false)}
                size={24}
              />
            </div>
            <div className="overflow-y-scroll  h-[70%]">

            
            {cartItems.map((elem) => (
              <div className="mt-1 flex items-center">
                <span>
                  <img
                    src={elem.product.mainImage}
                    alt=""
                    width={"230px"}
                    height={"300px"}
                  />
                  {/* {console.log("me from the cart bro", elem)} */}
                </span>
                <div className="w-full px-5">
                  <span className="flex w-full justify-between px-5 py-3">
                    <div className="font-bold">{elem.product.name}</div>
                    <div>₹{elem.product.price}</div>
                  </span>
                  <span className="flex w-full justify-between px-5 py-3">
                    <div>size {elem.inventory.size}</div>
                    <div className="flex items-center gap-4">
                      <button disabled={isUpadatingQuantity}>
                        <Minus
                          className={`${isUpadatingQuantity ? "cursor-not-allowed" : "cursor-pointer"}`}
                          size={16}
                          onClick={async () =>
                            await decrementQuantity(elem.inventory.id)
                          }
                        />
                      </button>
                      <span>
                        {isUpdatingId === elem.inventory.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          elem.quantity
                        )}
                      </span>
                      <button disabled={isUpadatingQuantity}>
                        <Plus
                          className={`${isUpadatingQuantity ? "cursor-not-allowed" : "cursor-pointer"}`}
                          size={16}
                          onClick={async () =>
                            await incrementQuantity(elem.inventory.id)
                          }
                        />
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            ))}
            </div>
            <div className="h-0.5 w-full bg-neutral-100"></div>
            <div className="flex w-full justify-between ">
                <span>Sub Total</span>
                <span>₹{subTotalAmount}</span>
            </div>
            <div className="h-0.5 w-full bg-neutral-100"></div>
            <button className="bg-black text-white font-medium w-full py-3 rounded-md ">Secure Checkout</button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default CartModalComponent;
