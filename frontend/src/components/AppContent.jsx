import { useState } from 'react';
import Buttons from './Buttons';
import AuthContent from './MessageContent';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import WelcomeContent from './WelcomeContent'

import { setAuthHeader } from '../utility';
import { config } from '../constants';

export default function AppContent() {

    const [componentToShow, setComponentToShow] = useState('welcome')

    function login() {
        setComponentToShow('login')
    };

    function register() {
        setComponentToShow('register')
    };

    function logout() {
        setComponentToShow('welcome')
        setAuthHeader(null);
    };

    function onSignUp(event, firstName, lastName, username, password) {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            })
        }

        fetch(`${config.url.BASE_URL}/register`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.token);
                if (data.token !== null && data.token !== "null") {
                    setAuthHeader(data.token);
                    setComponentToShow('messages')
                }
            })
            .catch((error) => {
                setComponentToShow('welcome')
            });
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
        </>
    );
}