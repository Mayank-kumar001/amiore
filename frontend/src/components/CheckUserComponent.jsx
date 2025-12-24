import React from "react";
import { authStore } from "../store/authStore";
import { motion } from "motion/react";
import { X, Loader2, Lock } from "lucide-react";

function CheckUserComponent({ userEmail, setUserEmail, setModalOpen, modalOpen }) {
  const { checkUser, isCheckingUser } = authStore();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="
        flex flex-col items-center justify-center gap-6 
        bg-white px-4 py-6 
        w-[90%] sm:w-[80%] md:w-[70%] lg:w-[500px] 
        h-auto lg:h-96 
        max-h-[90vh] overflow-y-auto 
        rounded-xl shadow-lg
      "
    >
      {isCheckingUser ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin text-neutral-700" size={32} />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex w-full items-center justify-between text-lg font-semibold">
            <span>Sign In</span>
            <span
              onClick={() => setModalOpen(false)}
              className="cursor-pointer hover:text-neutral-600"
            >
              <X />
            </span>
          </div>

          {/* Subtext */}
          <div className="text-sm text-neutral-800">
            Sign in with your email or sign up to become an Amiore member.
          </div>

          {/* Email Input */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm">Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full rounded-md border-2 border-neutral-400 p-2 focus:outline-none focus:border-black"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Continue Button */}
          <button
            className="w-full cursor-pointer rounded-md bg-black py-2 text-white transition hover:bg-neutral-800"
            onClick={async () => {
              await checkUser({ email: userEmail });
            }}
          >
            CONTINUE
          </button>

          {/* Security Info */}
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <Lock size={16} />
            <span>All data is kept secure</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default CheckUserComponent;
