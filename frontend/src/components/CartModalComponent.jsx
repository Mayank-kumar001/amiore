import { Loader2, Minus, Plus, X } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { cartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import SuggestedForYouComponent from "./SuggestedForYouComponent";

function CartModalComponent({ modalOpen, setModalOpen }) {
  const navigate = useNavigate();
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
    <div className="fixed z-20 inset-0 flex h-full w-full items-center justify-center bg-black/50">
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
          width: window.innerWidth < 768 ? "100%" : "50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          filter: `blur(4px)`,
          width: 0,
          height: "100vh",
        }}
        className="absolute right-0 h-full min-h-screen w-full bg-white px-4 py-6 flex flex-col gap-6 "
      >
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-10 flex justify-end">

              <X
                className="cursor-pointer hover:rotate-90 transition-transform duration-300"
                onClick={() => setModalOpen(false)}
                size={24}
              />
            </div>
            {cartItems.length !== 0 ? <div className="overflow-y-scroll  h-[70%]">


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
                            <Loader2 size={16} className="animate-spin" />
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
            </div> : <div className="flex flex-col h-full w-full items-center justify-between">
              <div className="self-start mb-4">Your shopping bag is empty.</div>
              <SuggestedForYouComponent setCartModalOpen={setModalOpen}/>
              </div>}
            {cartItems.length !== 0 &&<div className="flex flex-col gap-4">
            <div className="h-0.5 w-full bg-neutral-100"></div>
            <div className="flex w-full justify-between ">
              <span>Sub Total</span>
              <span>₹{subTotalAmount}</span>
            </div>
            <div className="h-0.5 w-full bg-neutral-100"></div>
            <button onClick={() => {
              setModalOpen(false);
              if (cartItems.length !== 0) navigate("/checkout");

            }} className="bg-black text-white font-medium w-full py-3 rounded-md cursor-pointer ">{cartItems.length !== 0 ? "Secure Checkout" : "Shop now"}</button>
            </div>}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default CartModalComponent;
