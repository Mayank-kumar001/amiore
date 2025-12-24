import React, { useState } from "react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import { X, Loader2, Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";

function SignInComponent({ setModalOpen, userEmail }) {
  const { isSigningIn, signIn, changeAuthState } = authStore();
  const [showPassword, setShowPassword] = useState(false);
  const [userRawData, setUserRawData] = useState({
    email: userEmail,
    userPassword: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
  });

  const handleSignIn = async () => {
    try {
      const data = {
        username: `${userRawData.firstName} ${userRawData.lastName}`,
        email: userRawData.email,
        password: userRawData.userPassword,
        dateOfBirth: `${userRawData.year}-${userRawData.month}-${userRawData.day}`,
      };

      if (!(new Date(data.dateOfBirth) instanceof Date) || isNaN(new Date(data.dateOfBirth))) {
        toast.error("Invalid date of birth");
        throw new Error("Invalid date format");
      }
      await signIn(data);
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
      className="flex h-fit min-h-96 w-full max-w-md flex-col items-center justify-center gap-6 bg-white px-4 py-5 sm:px-6 md:px-8 rounded-md"
    >
      {isSigningIn ? (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-medium">Sign In</span>
            <span
              onClick={() => setModalOpen(false)}
              className="cursor-pointer"
            >
              <X />
            </span>
          </div>

          {/* Form */}
          <form
            className="flex w-full flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            {/* Email */}
            <div className="flex w-full flex-col gap-1">
              <label className="self-start">Email</label>
              <input
                className="w-full cursor-not-allowed border-2 border-neutral-400 bg-neutral-200 p-2 text-neutral-400 focus:outline-0 rounded"
                type="email"
                value={userRawData.email}
                readOnly={false}
              />
            </div>

            {/* Name fields */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <div className="flex w-full flex-col gap-1">
                <label className="self-start">First Name</label>
                <input
                  className="w-full border-2 border-neutral-700 p-2 rounded focus:outline-0"
                  type="text"
                  placeholder="Robert"
                  required
                  onChange={(e) =>
                    setUserRawData((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <label className="self-start">Last Name</label>
                <input
                  className="w-full border-2 border-neutral-700 p-2 rounded focus:outline-0"
                  type="text"
                  placeholder="Pope"
                  required
                  onChange={(e) =>
                    setUserRawData((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* DOB */}
            <div className="flex w-full flex-col gap-1">
              <label className="self-start">Date of Birth</label>
              <div className="flex flex-wrap gap-2 border-2 border-neutral-700 p-2 rounded">
                <input
                  className="w-20 px-2 focus:outline-0 border rounded"
                  type="number"
                  placeholder="DD"
                  required
                  onChange={(e) =>
                    setUserRawData((prev) => ({ ...prev, day: e.target.value }))
                  }
                />
                <span className="text-xl font-bold text-neutral-400">/</span>
                <input
                  className="w-20 px-2 focus:outline-0 border rounded"
                  type="number"
                  placeholder="MM"
                  required
                  onChange={(e) =>
                    setUserRawData((prev) => ({ ...prev, month: e.target.value }))
                  }
                />
                <span className="text-xl font-bold text-neutral-400">/</span>
                <input
                  className="w-24 px-2 focus:outline-0 border rounded"
                  type="number"
                  placeholder="YYYY"
                  required
                  onChange={(e) =>
                    setUserRawData((prev) => ({ ...prev, year: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex w-full flex-col gap-1">
              <label className="self-start">Password</label>
              <div className="flex items-center gap-3 border-2 border-neutral-700 pr-2 rounded">
                <input
                  className="w-full p-2 focus:outline-0"
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
              type="submit"
              className="w-full cursor-pointer self-start bg-black py-2 text-white rounded"
            >
              CONTINUE
            </button>
            <button
              type="button"
              className="w-full cursor-pointer self-start border py-2 rounded"
              onClick={() => changeAuthState("checkUser")}
            >
              BACK TO LOG IN
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}

export default SignInComponent;
