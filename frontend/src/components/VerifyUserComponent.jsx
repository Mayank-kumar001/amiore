import React, { useState } from "react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import { X, Loader2 } from "lucide-react";

function VerifyUserComponent({ userEmail, setModalOpen, setAuthState }) {
  const [userVerificationCode, setUserVerificationCode] = useState("");
  const {
    isVerifyingUser,
    verifyUser,
    resendVerificationCode,
    isSendingVerificationCode,
  } = authStore();

  const handleUserVerification = async () => {
    try {
      const data = { email: userEmail, userVerificationCode };
      await verifyUser(data);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      await resendVerificationCode({ email: userEmail });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="flex h-fit w-full max-w-md flex-col items-center justify-center gap-6 bg-white px-4 py-5 sm:px-6 md:px-8 rounded-md"
    >
      {isVerifyingUser ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-medium">Verify User</span>
            <span
              onClick={() => setModalOpen(false)}
              className="cursor-pointer"
            >
              <X />
            </span>
          </div>

          {/* Info */}
          <div className="text-sm text-neutral-600 text-center">
            A verification code has been sent to your email.
          </div>

          {/* Verification input */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start">Verification Code</label>
            <input
              className="w-full border-2 border-neutral-700 p-2 rounded"
              type="text"
              placeholder="Enter verification code"
              required
              value={userVerificationCode}
              onChange={(e) => setUserVerificationCode(e.target.value)}
            />
          </div>

          {/* Continue button */}
          <button
            className="w-full cursor-pointer bg-black py-2 text-white rounded"
            onClick={handleUserVerification}
          >
            CONTINUE
          </button>

          {/* Back button */}
          <button
            className="w-full cursor-pointer border py-2 rounded"
            onClick={() => setAuthState("signIn")}
          >
            BACK TO SIGN IN
          </button>

          {/* Resend code */}
          <button
            onClick={handleResendVerificationCode}
            className="w-full cursor-pointer py-2 underline flex items-center gap-2 justify-center"
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
