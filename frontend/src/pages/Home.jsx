import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Loader2, Lock, X } from "lucide-react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import SignInComponent from "../components/signInComponent";
import LoginComponent from "../components/LoginComponent";
import VerifyUserComponent from "../components/VerifyUserComponent";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";
import ResetUserPassword from "../components/ResetUserPassword";
import CheckUserComponent from "../components/CheckUserComponent";
import AuthModalComponent from "../components/AuthModalComponent";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  // const [authState, setAuthState] = useState("checkUser"); // checkUser| signIn | login | verifyUser | forgotPassword | resetUserPassword

  const [userEmail, setUserEmail] = useState("");
  const { checkUser, isCheckingUser, authState } = authStore();

  const handleLogin = async () => {
    try {
      await login(userRawData);
      setModalOpen(false);
    } catch (error) {
      console.log("Error while login", error);
    }
  };

  return (
    <div className="relative min-h-[94vh] ">
      {/* <Navbar setModalOpen={setModalOpen} /> */}
      {/* auth modal start */}
      {/* {modalOpen && <AuthModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen}/>} */}

      {/* auth modal End */}
    </div>
  );
}

export default Home;
