import React from "react";
import { authStore } from "../store/authStore";
import {motion} from "motion/react"
import {X, Loader2, Lock} from "lucide-react"

function CheckUserComponent({userEmail, setUserEmail, setModalOpen, modalOpen}) {
  const { checkUser, isCheckingUser, authState } = authStore();
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
      className="flex h-96 w-md flex-col items-center justify-center gap-6 bg-white px-4 py-2"
    >
      {isCheckingUser ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <span>Sign In</span>
            <span
              onClick={() => {
                console.log(modalOpen)
                setModalOpen(false);
                
              }}
              className="cursor-pointer"
            >
              <X />
            </span>
          </div>
          <div>
            Sign in with your email or sign up to become an Amiore member.
          </div>
          <div className="flex w-full flex-col gap-1">
            <label className="self-start">Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-[100%] border-2 border-neutral-700 p-2"
              type="email"
              placeholder="Email"
            />
          </div>
          <button
            className="w-[100%] cursor-pointer self-start bg-black py-2 text-white"
            onClick={async () => {
              const res = await checkUser({ email: userEmail });
            }}
          >
            CONTINUE
          </button>
          <div className="flex items-baseline gap-4">
            <Lock />
            All data is kept secure
          </div>
        </>
      )}
    </motion.div>
  );
}

export default CheckUserComponent;
