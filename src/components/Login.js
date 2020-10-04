import React from 'react';
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useDataLayerValue } from "../StateManagement/StateProvider";
import '../assets/Login.css';
function Login() {

    const [{ }, dispatch] = useDataLayerValue();

    function signIn() {
        auth.signInWithPopup(provider)
            .then(res => {
                dispatch({
                    type: "SET_USER",
                    user: res.user
                })
            })
            .catch(err => {
                alert(err.message)
            });
    }
    return (
        <div className="login">
            <div className="login__text">
                <h1>Welcome to Global Chat</h1>
            </div>
            <div className="login__container">
                <img src="https://cdn.iconscout.com/icon/free/png-512/chatapp-898134.png" alt="logo"></img>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
