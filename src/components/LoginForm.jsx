import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from '../utils/axios';

import RightIconRectInput from "./RightIconRectInput";
import IconButton from "./IconButton";

import "./LoginForm.css";

import { ReactComponent as GoogleIcon } from '../assets/google-icon.svg';
import { UserContext } from "../context/UserContext";



function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userContext, setUserContext } = useContext(UserContext)


    const googleAuth = (event) => {
        event.preventDefault();
        const googleAuthUrl = process.env.REACT_APP_BACKEND_URL + "/auth/oauth/googleoauth";
        window.open(googleAuthUrl, "_blank", "width=500,height=500");
    }

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== process.env.REACT_APP_BACKEND_URL) return;
            const data = JSON.parse(event.data);
            const jwt = data.accessToken;

            localStorage.setItem('jwtToken', jwt);
            setUserContext(data.user);
            sessionStorage.setItem('user', JSON.stringify(data.user));

            toast.success("Logged In Successfully");

            if(data.emailSent){
                toast.info("An email with a temporary password to access your account has been sent to your email address. Please check your email.")
            }

            navigate(`/user/profile/${data.user._id}`);
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const login = (event) => {
        event.preventDefault();

        axios.post("/auth/login", { email: email, password: password }).then((res) => {
            console.log(res);
            if (res.data?.status == "success") {
                localStorage.setItem('jwtToken', res.data.accessToken);
                setUserContext(res.data.user);
                sessionStorage.setItem('user', JSON.stringify(res.data.user));

                toast.success("Logged In Successfully");

                navigate(`/user/profile/${res.data.user._id}`);
            } else {
                toast.error(res.data?.message);
            }

        }).catch((err) => {
            console.log(err);
            if (err.response?.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        });
    }

    return (
        <>
            <form onSubmit={login} className="login-form form auth-form">
                <div className="form-title">Login</div>
                <RightIconRectInput onChange={setEmail} type="email" placeholder="example@email.com" icon="email" inputLabel="Email" />
                <RightIconRectInput onChange={setPassword} type="password" placeholder="Enter atleast 8 characters" icon="lock" inputLabel={<div className="password__label"><span>Password</span><a>Forgot Password?</a></div>} />

                <IconButton content={"Login"} extraClass={"btn-borderw-1 btn-borderc-747775 btn-margin login-btn"} />
                <div className="h-divider"></div>
                <IconButton icon="google" onClick={googleAuth} iconb={<GoogleIcon />} w="max" extraClass="google-auth-btn btn-margin" content={"Continue with Google"} />
            </form>
            <div className="form-bottom-bar">
                <div>T&C</div>
                <div>Help</div>
                <div className="register-link"><Link to="/auth/register"><span>Register</span><span className="register__icon">arrow_forward</span></Link></div>
            </div>
        </>
    );
}

export default LoginForm;