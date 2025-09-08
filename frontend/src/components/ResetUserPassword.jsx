import React, { useState } from "react";
import { motion }  from "motion/react"
import { authStore } from "../store/authStore";
import {X, Loader2} from "lucide-react"

function ResetUserPassword({ userEmail, setModalOpen, setAuthState }) {
  const [userRawData, setUserRawData] = useState({
    userVerificationCode: "",
    newPassword: "",
    confirmPassword: "",
    email: userEmail
  });
  const {isResettingPassword, resetPassword, resendVerificationCode,changeAuthState} = authStore();

  const handleUserPasswordReset = async () => {
    try {
      console.log(userRawData)
      await resetPassword(userRawData);
    } catch (error) {
      
    }
  }

  const handleResendVerificationCode = async () => {
    try {
        console.log(userEmail);
        await resendVerificationCode({email : userEmail});
      } catch (error) {
        console.log(error);
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
      {isResettingPassword ? (
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
              value={userRawData.userVerificationCode}
              onChange={(e) =>
                setUserRawData((prev) => ({
                    ...prev,
                    userVerificationCode: e.target.value
                }))
              }
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label className="self-start">New Password</label>
            <input
              className="w-[100%] border-2 border-neutral-700 p-2"
              type="email"
              placeholder="Enter new password"
              required={true}
              value={userRawData.newPassword}
              onChange={(e) =>
                setUserRawData((prev) => ({
                    ...prev,
                    newPassword: e.target.value
                }))
              }
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label className="self-start">Confirm Password</label>
            <input
              className="w-[100%] border-2 border-neutral-700 p-2"
              type="email"
              placeholder="Re enter the password"
              required={true}
              value={userRawData.confirmPassword}
              onChange={(e) =>
                setUserRawData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value
                }))
              }
            />
          </div>
          <button
            className="w-[100%] self-start bg-black py-2 text-white cursor-pointer"
            onClick={handleUserPasswordReset}
          >
            CONTINUE
          </button>
          <button
            className="w-[100%] self-start border py-2 cursor-pointer"
            onClick={() => changeAuthState("checkUser")}
          >
            BACK TO SIGN IN
          </button>
          <button onClick={handleResendVerificationCode} className="w-[100%] self-start py-2 underline cursor-pointer">
            RESEND CODE
          </button>
        </>
      )}
    </motion.div>
  );
}

export default ResetUserPassword;
