import React, { useState } from 'react'
import {motion} from "motion/react"
import { authStore } from '../store/authStore';
import { X, Loader2, Eye, EyeClosed } from "lucide-react";


function LoginComponent({setModalOpen, userEmail}) {
    const { isLoggingIn, login,changeAuthState } = authStore();
    const [userRawData, setUserRawData] = useState({
          email: userEmail,
          userPassword: "",
        });
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async () => {
    try {
      await login(userRawData);
      setModalOpen(false);
    } catch (error) {
      console.log("Error while login", error);
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
              className="flex h-[32rem] w-md flex-col items-center justify-center gap-6 bg-white px-4 py-2"
            >
              {isLoggingIn ? (
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
                  <div>Please sign in with your email and password.</div>
                  <div className="flex w-full flex-col gap-1">
                    <label className="self-start">Email</label>
                    <input
                      className="w-[100%] cursor-not-allowed border-2 border-neutral-400 bg-neutral-200 p-2 text-neutral-400 focus:outline-0"
                      type="email"
                      value={userRawData.email}
                      readOnly={false}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-1">
              <label className="self-start">Password</label>
              <div className="flex items-center gap-3 border-2 border-neutral-700 pr-2">
                <input
                  className="w-[100%] p-2 focus:outline-0"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required={true}
                  value={userRawData.userPassword}
                  onChange={(e) =>
                    setUserRawData((prev) => ({
                      ...prev,
                      userPassword: e.target.value,
                    }))
                  }
                />
                {showPassword ? (
                  <Eye
                    className="cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
                  <button
                    className="w-[100%] self-start bg-black py-2 text-white cursor-pointer"
                    onClick={handleLogin}
                  >
                    CONTINUE
                  </button>
                  <button
                    className="w-[100%] self-start border py-2 cursor-pointer"
                    onClick={() => changeAuthState("checkUser")}
                  >
                    BACK TO SIGN IN
                  </button>
                  <button className="w-[100%] self-start py-2 underline cursor-pointer"
                  onClick={()=> changeAuthState("forgotPassword")}
                  >
                    FORGOT PASSWORD
                  </button>
                </>
              )}
            </motion.div>
  )
}

export default LoginComponent