import React from 'react';
import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent'
import { setAuthHeader } from '../utility';

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome"
        }
    };

    login = () => {
        this.setState({ componentToShow: "login" })
    };

    logout = () => {
        this.setState({ componentToShow: "welcome" })
        setAuthHeader(null);
    };

    onLogin = (e, username, password) => {
        e.preventDefault();

        const url = 'http://localhost:8080'
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: username,
                password: password
            })
        }

        fetch(`${url}/login`, options)
            .then((response) => response.json())
            .then((data) => {
                if (data.token !== null && data.token !== "null") {
                    setAuthHeader(data.token);
                    this.setState({ componentToShow: "messages" });
                }
            })
            .catch((error) => {
                this.setState({ componentToShow: "welcome" })
            });
    };



    onRegister = (event, firstName, lastName, username, password) => {
        event.preventDefault();

        const url = 'http://localhost:8080'
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

        fetch(`${url}/register`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.token);
                if (data.token !== null && data.token !== "null") {
                    setAuthHeader(data.token);
                    this.setState({ componentToShow: "messages" });
                }
            })
            .catch((error) => {
                this.setState({ componentToShow: "welcome" })
            });
    };

    render() {
        return (
            <>
                <Buttons
                    login={this.login}
                    logout={this.logout}
                />

                {this.state.componentToShow === "welcome" && <WelcomeContent />}
                {this.state.componentToShow === "login"
                    && <LoginForm
                        onLogin={this.onLogin}
                        onRegister={this.onRegister}
                    />}
                {this.state.componentToShow === "messages" && <AuthContent />}
            </>
        );
    };
}