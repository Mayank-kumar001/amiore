import React, { useState } from "react";
import { motion }  from "motion/react"
import { authStore } from "../store/authStore";
import {X, Loader2} from "lucide-react"

function ForgotPasswordComponent({ setUserEmail, setModalOpen, setAuthState }) {
  const [email, setEmail] = useState("");
  const {isSendingVerificationCode, forgotPassword,changeAuthState} = authStore();
  const handleForgetUserPassword = async () => {
    console.log({
        email,
    })
    try {
      await forgotPassword({email});
    } catch (error) {
      
    }
  }

 
    
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
      }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
      className="flex h-fit w-md flex-col items-center justify-center gap-6 bg-white px-4 py-4"
    >
      {isSendingVerificationCode ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <span>Sign In</span>
            <span
              onClick={() => {
                setModalOpen(false);
              }}
              className="cursor-pointer"
            >
              <X />
            </span>
          </div>
          <div>Enter your Email to reset your password</div>

          <div className="flex w-full flex-col gap-1">
            <label className="self-start">Email</label>
            <input
              className="w-[100%] border-2 border-neutral-700 p-2"
              type="email"
              placeholder="Enter Email"
              required={true}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <button
            className="w-[100%] self-start bg-black py-2 text-white cursor-pointer"
            onClick={handleForgetUserPassword}
          >
            CONTINUE
          </button>
          <button
            className="w-[100%] self-start border py-2 cursor-pointer"
            onClick={() => changeAuthState("checkUser")}
          >
            BACK TO SIGN IN
          </button>
        </>
      )}
    </motion.div>
  );
}

export default ForgotPasswordComponent;
