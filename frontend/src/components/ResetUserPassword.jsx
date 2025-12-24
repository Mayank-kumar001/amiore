import React, { useState } from "react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import { X, Loader2 } from "lucide-react";

function ResetUserPassword({ userEmail, setModalOpen, setAuthState }) {
  const [userRawData, setUserRawData] = useState({
    userVerificationCode: "",
    newPassword: "",
    confirmPassword: "",
    email: userEmail,
  });
  const {
    isResettingPassword,
    resetPassword,
    resendVerificationCode,
    isSendingVerificationCode,
    changeAuthState,
  } = authStore();

  const handleUserPasswordReset = async () => {
    try {
      console.log(userRawData);
      await resetPassword(userRawData);
    } catch (error) {}
  };

  const handleResendVerificationCode = async () => {
    try {
      console.log(userEmail);
      await resendVerificationCode({ email: userEmail });
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
      {isResettingPassword ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">Reset Password</span>
            <span
              onClick={() => setModalOpen(false)}
              className="cursor-pointer text-gray-600 hover:text-black"
            >
              <X />
            </span>
          </div>

          {/* Info */}
          <div className="text-sm text-gray-700">
            Verification code has been sent to your email
          </div>

          {/* Verification Code */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm font-medium">
              Verification Code
            </label>
            <input
              className="w-full rounded-md border-2 border-neutral-300 p-2 text-sm focus:border-black focus:outline-none"
              type="text"
              placeholder="Enter Verification Code"
              required
              value={userRawData.userVerificationCode}
              onChange={(e) =>
                setUserRawData((prev) => ({
                  ...prev,
                  userVerificationCode: e.target.value,
                }))
              }
            />
          </div>

          {/* New Password */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm font-medium">
              New Password
            </label>
            <input
              className="w-full rounded-md border-2 border-neutral-300 p-2 text-sm focus:border-black focus:outline-none"
              type="password"
              placeholder="Enter new password"
              required
              value={userRawData.newPassword}
              onChange={(e) =>
                setUserRawData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm font-medium">
              Confirm Password
            </label>
            <input
              className="w-full rounded-md border-2 border-neutral-300 p-2 text-sm focus:border-black focus:outline-none"
              type="password"
              placeholder="Re-enter the password"
              required
              value={userRawData.confirmPassword}
              onChange={(e) =>
                setUserRawData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>

          {/* Buttons */}
          <button
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-800"
            onClick={handleUserPasswordReset}
          >
            CONTINUE
          </button>

          <button
            className="w-full rounded-md border py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => changeAuthState("checkUser")}
          >
            BACK TO SIGN IN
          </button>

          <button
            onClick={handleResendVerificationCode}
            className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 underline hover:text-black cursor-pointer"
          >
            RESEND CODE
            {isSendingVerificationCode && <div><Loader2 className="animate-spin"/></div>}
          </button>
        </>
      )}
    </motion.div>
  );
}

export default ResetUserPassword;
