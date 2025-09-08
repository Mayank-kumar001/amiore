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
  const validateDate = (date) => {
    try {
      const dateObj = new Date(date);
      console.log(typeof dateObj);
    } catch (error) {
      throw error;
      toast.error("Invalid date format");
    }
  };
  const handleSignIn = async () => {
    try {
      const data = {
        username: `${userRawData.firstName} ${userRawData.lastName}`,
        email: userRawData.email,
        password: userRawData.userPassword,
        dateOfBirth: `${userRawData.year}-${userRawData.month}-${userRawData.day}`,
      };

      console.log(data);
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
      className="flex h-fit min-h-96 w-md flex-col items-center justify-center gap-6 bg-white px-4 py-5"
    >
      {isSigningIn ? (
        <div className="flex w-full items-center justify-center">
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
          {/* <div>Please sign in with your email and password.</div> */}
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              (e.preventDefault(), handleSignIn());
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <label className="self-start">Email</label>
              <input
                className="w-[100%] cursor-not-allowed border-2 border-neutral-400 bg-neutral-200 p-2 text-neutral-400 focus:outline-0"
                type="email"
                value={userRawData.email}
                readOnly={false}
              />
            </div>
            <div className="flex gap-5">
              <div className="flex w-full flex-col gap-1">
                <label className="self-start">First Name</label>
                <input
                  className="w-[100%] border-2 border-neutral-700 p-2"
                  type="text"
                  placeholder="Robert"
                  required={true}
                  onChange={(e) =>
                    setUserRawData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <label className="self-start">LastName</label>
                <input
                  className="w-[100%] border-2 border-neutral-700 p-2"
                  type="text"
                  placeholder="pope"
                  required={true}
                  onChange={(e) =>
                    setUserRawData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div>DOB</div>
              <div className="flex gap-2 border-2 border-neutral-700 p-2">
                <input
                  className="w-20 px-2 focus:outline-0"
                  type="number"
                  maxLength={2}
                  placeholder="DD"
                  required={true}
                  onChange={(e) =>
                    setUserRawData((prev) => ({ ...prev, day: e.target.value }))
                  }
                />
                <span className="text-xl font-bold text-neutral-400">/</span>
                <input
                  className="w-20 px-2 focus:outline-0"
                  type="number"
                  maxLength={2}
                  placeholder="MM"
                  required={true}
                  onChange={(e) =>
                    setUserRawData((prev) => ({
                      ...prev,
                      month: e.target.value,
                    }))
                  }
                />
                <span className="text-xl font-bold text-neutral-400">/</span>
                <input
                  className="w-20 px-2 focus:outline-0"
                  type="number"
                  maxLength={4}
                  placeholder="YYYY"
                  required={true}
                  onChange={(e) =>
                    setUserRawData((prev) => ({
                      ...prev,
                      year: e.target.value,
                    }))
                  }
                />
              </div>
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
              type="submit"
              className="w-[100%] cursor-pointer self-start bg-black py-2 text-white"
            >
              CONTINUE
            </button>
            <button
              className="w-[100%] cursor-pointer self-start border py-2"
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
