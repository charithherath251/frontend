import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";

import axios from '../utils/axios';

import RightIconRectInput from "./RightIconRectInput";
import IconButton from "./IconButton";

import { UserContext } from "../context/UserContext";

import "./LoginForm.css"

import { ReactComponent as GoogleIcon } from '../assets/google-icon.svg';



function RegisterForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("-");
    const [repPassword, setRepPassword] = useState("");

    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [repPasswordError, setRepPasswordError] = useState(null);

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
            if (data.emailSent) {
                toast.info("An email with a temporary password to access your account has been sent to your email address. Please check your email.")
            }

            navigate(`/user/profile/${data.user._id}`);
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    //Form Submit

    const register = (event) => {
        event.preventDefault();

        if (emailError || passwordError) {
            toast.error(
                <span>
                    {emailError}{emailError && <br />}
                    {passwordError}{passwordError && <br />}
                    {repPasswordError}
                </span>
            )
            return
        }

        axios.post('/auth/register', {
            email: email,
            password: password,
            repPassword: repPassword
        }).then((res) => {
            console.log(res);
            if (res.data?.status == "success") {
                toast.success(res.data?.message);
                navigate(`/auth/verify/${res.data.user._id}`, { state: { state: "success", message: "Registration Successfull" } });
            }
        }).catch((err) => {
            console.log(err);
            showError(err);
        });
    }

    const showError = (err) => {
        console.log(err);
        if (err?.response?.data.message) {
            toast.error(err.response?.data.message);
        } else if (err?.message) {
            toast.error(err.message);
        } else {
            toast.error(err);
        }
    }


    /* Check Email */

    useEffect(() => {
        let pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        let val = email.match(pattern);

        if (val) {
            setEmailError(null);
            return;
        }

        setEmailError("Enter a Valid Email");

    }, [email]);


    /* Check Password */

    useEffect(() => {
        let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let val = pattern.test(password);

        let errors = [];

        if (val) {
            setPasswordError(null)
            return
        } else {
            //let missing = [];
            // Check for lowercase letter
            if (!/[a-z]/.test(password)) {
                errors.push("At least 1 lowercase letter");
                //  missing.push("At least 1 lowercase letter");
            }

            // Check for uppercase letter
            if (!/[A-Z]/.test(password)) {
                errors.push("At least 1 uppercase letter");
                //missing.push("At least 1 uppercase letter");
            }

            // Check for digit
            if (!/[0-9]/.test(password)) {
                errors.push("At least 1 digit");
                //missing.push("At least 1 digit");
            }

            // Check for special character
            if (!/[!@#\$%\^&\*]/.test(password)) {
                errors.push("At least 1 special character");
                //missing.push("At least 1 special character");
            }

            // Check for minimum length
            if (password.length < 8) {
                errors.push("Minimum length of 8 characters");
                //missing.push("Minimum length of 8 characters");
            }
        }

        setPasswordError(errors[errors.length - 1])

    }, [password])

    /* Check Repeat Password */

    useEffect(() => {
        if (repPassword != password) {
            setRepPasswordError("Passwords do not match");
            return;
        }

        setRepPasswordError(null);
    }, [repPassword, password]);


    return (
        <>
            <form action="" onSubmit={register} className="register-form form auth-form">
                <div className="form-title">Register</div>
                <RightIconRectInput extraClass={`content-${emailError ? false : true}`} onChange={setEmail} placeholder="example@email.com" icon="email"
                    inputLabel={
                        <div className="password__label">
                            <span>Email</span>
                            <span className="error right-label">{emailError ? <div>{emailError}</div> : null}</span>
                        </div>
                    }
                    required />
                <br />
                <RightIconRectInput extraClass={`content-${passwordError ? false : true}`} onChange={setPassword} type="password" placeholder="Enter atleast 8 characters" icon="lock"
                    inputLabel={
                        <div className="password__label">
                            <span>Password</span>
                            <span className="error right-label">{passwordError ? <div>{passwordError}</div> : null}</span>
                        </div>
                    }
                    required />
                <RightIconRectInput extraClass={`content-${repPasswordError ? false : true}`} onChange={setRepPassword} type="password" placeholder="Repeat Password" icon="lock"
                    inputLabel={
                        <div className="password__label">
                            <span>Repeat Password</span>
                            <span className="error right-label">{repPasswordError ? <div>{repPasswordError}</div> : null}</span>
                        </div>
                    }
                    required />
                <br />
                <IconButton content={"Register"} type="submit" extraClass={"btn-borderw-1 btn-borderc-747775 btn-margin login-btn"} />
                <div className="h-divider"></div>
                <IconButton icon="google" onClick={googleAuth} iconb={<GoogleIcon />} w="max" extraClass="google-auth-btn btn-margin" content={"Continue with Google"} />
            </form>
            <div className="form-bottom-bar">
                <div>T&C</div>
                <div>Help</div>
                <div className="register-link"><Link to="/auth/login"><span>Login</span><span className="register__icon">arrow_forward</span></Link></div>
            </div>
        </>
    );
}

export default RegisterForm;