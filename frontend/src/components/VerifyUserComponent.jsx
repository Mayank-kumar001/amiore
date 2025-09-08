import React, { useState } from "react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import { X, Loader2 } from "lucide-react";

function VerifyUserComponent({ userEmail, setModalOpen, setAuthState }) {
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const { isVerifyingUser, verifyUser, resendVerificationCode, isSendingVerificationCode } = authStore();
  const handleUserVerification = async () => {
    try {
      const data = {
        email: userEmail,
        userVerificationCode,
      };
      console.log(data);
      await verifyUser(data);
      setModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  }

    const handleResendVerificationCode = async () => {
      try {
        console.log(userEmail);
        await resendVerificationCode({email : userEmail});
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
        className="flex h-fit w-md flex-col items-center justify-center gap-6 bg-white px-4 py-4"
      >
        {isVerifyingUser ? (
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
            <div>Verification code has been sent to your email</div>

            <div className="flex w-full flex-col gap-1">
              <label className="self-start">Verification Code</label>
              <input
                className="w-[100%] border-2 border-neutral-700 p-2"
                type="email"
                placeholder="Enter Verification Code"
                required={true}
                value={userVerificationCode}
                onChange={(e) => setUserVerificationCode(e.target.value)}
              />
            </div>
            <button
              className="w-[100%] cursor-pointer self-start bg-black py-2 text-white"
              onClick={handleUserVerification}
            >
              CONTINUE
            </button>
            <button
              className="w-[100%] cursor-pointer self-start border py-2"
              onClick={() => setAuthState("signIn")}
            >
              BACK TO SIGN IN
            </button>
            <button
              onClick={handleResendVerificationCode}
              className="w-[100%] cursor-pointer self-start py-2 underline flex gap-2 justify-center"
            >
              RESEND CODE
              {isSendingVerificationCode && <Loader2 className="animate-spin" />}
            </button>
          </>
        )}
      </motion.div>
    );
  
}
export default VerifyUserComponent;
