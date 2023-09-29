import { useState } from 'react';
import Buttons from './Buttons';
import AuthContent from './MessageContent';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import WelcomeContent from './WelcomeContent'
import LogoutContent from './LogoutContent'

import { setAuthHeader } from '../utility';

export default function AppContent() {

    const [componentToShow, setComponentToShow] = useState('welcome')

    function login() {
        setComponentToShow('login')
    };

    function register() {
        setComponentToShow('register')
    };

    function logout() {
        setComponentToShow('logout')
        setAuthHeader(null);
    };

    return (
        <>
            <Buttons
                login={login}
                register={register}
                logout={logout}
            />

            {componentToShow === "welcome" && <WelcomeContent />}
            {componentToShow === "login" && <SignInForm componentToShow={setComponentToShow} />}
            {componentToShow === "register" && <SignUpForm componentToShow={setComponentToShow} />}
            {componentToShow === "messages" && <AuthContent />}
            {componentToShow === "logout" && <LogoutContent />}
        </>
    );
}