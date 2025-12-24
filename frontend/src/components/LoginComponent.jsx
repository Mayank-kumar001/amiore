import React, { useState } from "react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import { X, Loader2, Eye, EyeClosed } from "lucide-react";

function LoginComponent({ setModalOpen, userEmail }) {
  const { isLoggingIn, login, changeAuthState } = authStore();

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
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="
        flex flex-col items-center justify-center gap-6 
        bg-white px-4 py-6 
        w-[90%] sm:w-[80%] md:w-[60%] lg:w-[400px] 
        h-auto lg:h-[32rem] 
        max-h-[90vh] overflow-y-auto 
        rounded-xl shadow-lg
      "
    >
      {isLoggingIn ? (
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
            Please sign in with your email and password.
          </div>

          {/* Email Input */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm">Email</label>
            <input
              className="w-full cursor-not-allowed border-2 border-neutral-400 bg-neutral-200 p-2 text-neutral-400 focus:outline-none rounded-md"
              type="email"
              value={userRawData.email}
              readOnly
            />
          </div>

          {/* Password Input */}
          <div className="flex w-full flex-col gap-1">
            <label className="self-start text-sm">Password</label>
            <div className="flex items-center gap-3 border-2 border-neutral-700 pr-2 rounded-md">
              <input
                className="w-full p-2 focus:outline-none rounded-md"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
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

          {/* Buttons */}
          <button
            className="w-full bg-black py-2 text-white cursor-pointer rounded-md transition hover:bg-neutral-800"
            onClick={handleLogin}
          >
            CONTINUE
          </button>

          <button
            className="w-full border py-2 cursor-pointer rounded-md transition hover:bg-neutral-100"
            onClick={() => changeAuthState("checkUser")}
          >
            BACK TO SIGN IN
          </button>

          <button
            className="w-full py-2 underline cursor-pointer text-sm text-blue-600"
            onClick={() => changeAuthState("forgotPassword")}
          >
            FORGOT PASSWORD
          </button>
        </>
      )}
    </motion.div>
  );
}

export default LoginComponent;
