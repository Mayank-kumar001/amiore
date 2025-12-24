import React, { useState } from "react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import { X, Loader2 } from "lucide-react";

function ForgotPasswordComponent({ setUserEmail, setModalOpen, setAuthState }) {
  const [email, setEmail] = useState("");
  const { isSendingVerificationCode, forgotPassword, changeAuthState } =
    authStore();

  const handleForgetUserPassword = async () => {
    console.log({ email });
    try {
      await forgotPassword({ email });
    } catch (error) {
      console.log(error);
    }
  };

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
      className="flex h-fit w-full max-w-md flex-col items-center justify-center gap-6 rounded-xl bg-white px-4 py-6 shadow-md sm:px-6 sm:py-8"
    >
      {isSendingVerificationCode ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">Forgot Password</span>
            <span
              onClick={() => setModalOpen(false)}
              className="cursor-pointer text-gray-600 hover:text-black"
            >
              <X />
            </span>
          </div>

          {/* Info */}
          <div className="text-sm text-gray-700">
            Enter your email to reset your password
          </div>

          {/* Email Input */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm font-medium">Email</label>
            <input
              className="w-full rounded-md border-2 border-neutral-300 p-2 text-sm focus:border-black focus:outline-none"
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <button
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-800"
            onClick={handleForgetUserPassword}
          >
            CONTINUE
          </button>

          <button
            className="w-full rounded-md border py-2 text-sm font-medium hover:bg-gray-50"
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
