import { create } from 'zustand'
import { axiosInstance } from '../utils/axiosInstance';
import toast from "react-hot-toast"
import { resendVerficationCodeSchema } from '../../../backend/src/validators/auth.validator';

export const authStore = create((set,get) => ({
    userData: null,
    isLoggingIn: false,
    isSigningIn: false,
    isVerifyingUser:false,
    isSendingVerificationCode:false,
    isResettingPassword: false,
    isCheckingUser: false,
    isCheckingUserAuth: false,
    authModalOpen: false,
    setAuthModalOpen: (state) => set({ authModalOpen: state }),
    authState: "checkUser",// checkUser| signIn | login | verifyUser | forgotPassword | resetUserPassword | authenticated
    
    changeAuthState: (state) => set({ authState: state }),
    checkAuth: async () => {
        try {
            set({isCheckingUserAuth: true})
            const res = await axiosInstance.get("/auth/checkAuth");
            console.log(res.data);
            set({ userData: res.data.data });
            set({authState: "authenticated"})
        } catch (error) {
            // toast.error(`${error.response.data.message}`);
            set({authState: "checkUser"})    
        } finally {
        set({ isCheckingUserAuth: false })
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            console.log(res.data);
            set({ userData: res.data.data });
            // console.log("hellllo jiii", )
            localStorage.setItem("user-storage", JSON.stringify(res.data.data))
            toast.success("login successfull")
            set({authState: "authenticated"})

        } catch (error) {
            // console.log("Error while login", error);
            toast.error(`${error.response.data.message}`);
            throw new Error("error in login the user")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    signIn: async (data) => {
        set({isSigningIn:true});
        try {
            const res = await axiosInstance.post("/auth/register", data);
            console.log(res.data);
            set({ userData: res.data.data });
            toast.success("User created successfully")
            set({authState: "verifyUser"})
        } catch (error) {
            // console.log("Error while login", error);
            toast.error(`${error.response.data.message}`);
            throw new Error("error in creating the user")
        } finally {
            set({ isSigningIn: false })
        }
    },
    verifyUser: async (data) => {
        set({isVerifyingUser:true});
        try {
            const res = await axiosInstance.post("/auth/email-verify", data);
            console.log(res.data);
            toast.success("verification successfull")
            set({authState: "authenticated"})
        } catch (error) {
            // console.log("Error while login", error);
            toast.error(`${error.response.data.message}`);
            throw new Error("error in verifying the user")
        } finally {
            set({ isVerifyingUser: false })
        }
    },
    forgotPassword: async (data) => {
        set({isSendingVerificationCode:true});
        try {
            const res = await axiosInstance.post("/auth/forgot-password", data);
            console.log(res.data);
          
            toast.success("verification code sent successfull")
            set({authState: "resetUserPassword"})
        } catch (error) {
            // console.log("Error while login", error);
            toast.error(`${error.response.data.message}`);
            throw new Error("error in sending verfication code")
        } finally {
            set({ isSendingVerificationCode: false })
        }
    },
    resetPassword: async (data) => {
        set({isResettingPassword:true});
        try {
            const res = await axiosInstance.post("/auth/reset-password", data);
            console.log(res.data);
          
            toast.success("Password changed successfull")
            set({authState: "login"})
        } catch (error) {
            // console.log("Error while login", error);
            toast.error(`${error.response.data.message}`);
            throw new Error("error in changing the password")
        } finally {
            set({ isResettingPassword: false })
        }
    },

    checkUser: async function (data) {
        set({isCheckingUser:true});
        try {
            const res = await axiosInstance.get(`/auth/checkUser/${data.email}`);
            console.log("hello ji kese ho app", res.data);
            if(res.data.data.isVerified){
                set({authState: "login"})
            }else{
                console.log("hello jii kese hooooo");
                const {resendVerificationCode} = get();
                await resendVerificationCode(data)
                set({authState: "verifyUser"})
            }
        } catch (error) {
            console.log(error);
            set({authState: "signIn"})
        } finally {
            set({ isCheckingUser: false })
        }
    },
    resendVerificationCode: async (data) => {
        set({isSendingVerificationCode:true});
        try {
            const res = await axiosInstance.post(`/auth/resend-verification-code`, data);
            console.log(res.data);

            toast.success("verification code sent")
        } catch (error) {
            throw new Error("error in sending verification code")
        } finally {
            set({ isSendingVerificationCode: false })
        }
    }

}))