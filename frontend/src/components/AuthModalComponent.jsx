import React, { useState } from 'react'
import { authStore } from '../store/authStore';
import CheckUserComponent from './CheckUserComponent';
import SignInComponent from './SignInComponent';
import LoginComponent from './LoginComponent';
import VerifyUserComponent from './VerifyUserComponent';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import ResetUserPassword from './ResetUserPassword';

function AuthModalComponent({modalOpen, setModalOpen}) {
    const { checkUser, isCheckingUser, authState } = authStore();
    const [userEmail, setUserEmail] = useState("");
    return (

        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
            {authState === "checkUser" && (
                <CheckUserComponent
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                />
            )}
            {authState === "signIn" && (
                <SignInComponent
                    userEmail={userEmail}
                    setModalOpen={setModalOpen}
                // setAuthState={setAuthState}
                />
            )}
            {authState === "login" && (
                <LoginComponent
                    userEmail={userEmail}
                    setModalOpen={setModalOpen}
                // setAuthState={setAuthState}
                />
            )}
            {authState === "verifyUser" && (
                <VerifyUserComponent
                    userEmail={userEmail}
                    setModalOpen={setModalOpen}
                // setAuthState={setAuthState}
                />
            )}
            {authState === "forgotPassword" && (
                <ForgotPasswordComponent
                    setUserEmail={setUserEmail}
                    setModalOpen={setModalOpen}
                // setAuthState={setAuthState}
                />
            )}
            {authState === "resetUserPassword" && (
                <ResetUserPassword
                    userEmail={userEmail}
                    setModalOpen={setModalOpen}
                // setAuthState={setAuthState}
                />
            )}
        </div>

    )
}

export default AuthModalComponent
