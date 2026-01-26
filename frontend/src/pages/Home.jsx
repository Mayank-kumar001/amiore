import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Loader2, Lock, X } from "lucide-react";
import { motion } from "motion/react";
import { authStore } from "../store/authStore";
import SignInComponent from "../components/SignInComponent";
import LoginComponent from "../components/LoginComponent";
import VerifyUserComponent from "../components/VerifyUserComponent";
import ForgotPasswordComponent from "../components/ForgotPasswordComponent";
import ResetUserPassword from "../components/ResetUserPassword";
import CheckUserComponent from "../components/CheckUserComponent";
import AuthModalComponent from "../components/AuthModalComponent";
import { cartStore } from "../store/cartStore";
import CartModalComponent from "../components/CartModalComponent";
import Footer from "../components/Footer";
import HamburgerComponent from "../components/HamburgerComponent";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  // const [authState, setAuthState] = useState("checkUser"); // checkUser| signIn | login | verifyUser | forgotPassword | resetUserPassword

  const { authModalOpen, setAuthModalOpen, setHamburgerOpen,hamburgerOpen } = authStore();
  const { cartModalOpen, setCartModalOpen } = cartStore();
  const [scrollPos, setScrollPos] = useState(0);
  const [secondaryHamburgerOpen, setSecondaryHamburgerOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    if (authModalOpen || cartModalOpen || hamburgerOpen) {
      setScrollPos(window.scrollY);
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
    } else {
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
      document.body.style.overflow = "auto";
    }

    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [authModalOpen, cartModalOpen]);

  return (
    <div className="min-h-[94vh] w-full">
      <div className='w-full bg-black text-white text-center text-xs font-medium py-3 hover:text-gray-300'>NEW ARRIVALS HAVE LANDED - SHOP NOW</div>
      <Navbar setAuthModalOpen={setAuthModalOpen} setCartModalOpen={setCartModalOpen} setHamburgerOpen={setHamburgerOpen} hamburgerOpen={hamburgerOpen} secondaryHamburgerOpen={secondaryHamburgerOpen} setSecondaryHamburgerOpen={setSecondaryHamburgerOpen} isSearch={isSearch} setIsSearch={setIsSearch} />
      <div className="w-full h-full relative">
      <HamburgerComponent secondaryHamburgerOpen={secondaryHamburgerOpen} setSecondaryHamburgerOpen={setSecondaryHamburgerOpen} />
      </div>

      {authModalOpen && <AuthModalComponent modalOpen={authModalOpen} setModalOpen={setAuthModalOpen} />}
      {cartModalOpen && <CartModalComponent modalOpen={cartModalOpen} setModalOpen={setCartModalOpen}  />}
      <div className="w-full h-screen">
        <img className="w-full h-full object-cover object-center" src="https://res.cloudinary.com/dinmal6os/image/upload/v1758805367/Gemini_Generated_Image_dmxofbdmxofbdmxo_ekytcy.png" alt="" />
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-black">
        
        <img
          className="w-full lg:w-1/2 h-screen lg:h-screen object-cover object-center"
          src="https://images.unsplash.com/photo-1675045157732-f6a114767994?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xFdkFwOWVvQk9Ed3x8ZW58MHx8fHx8"
          alt=""
        />

       
        <img
          className="w-full lg:w-1/2 h-screen lg:h-screen object-cover object-center"
          src="https://res.cloudinary.com/dinmal6os/image/upload/v1758868369/james-balensiefen-XovTIAjyx2E-unsplash_gu5s8s.jpg"
          alt=""
        />
      </div>


      <div className="w-full h-screen bg-red-200 ">
        <img className="w-full h-screen object-cover object-center" src="https://res.cloudinary.com/dinmal6os/image/upload/v1758868374/brooke-cagle-wKOKidNT14w-unsplash_mmb38e.jpg" alt="" />
      </div>

      <Footer></Footer>


    </div>
  );
}

export default Home;
