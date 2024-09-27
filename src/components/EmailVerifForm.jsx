import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../utils/axios";
import RightIconRectInput from "./RightIconRectInput";
import IconButton from "./IconButton";
import "./EmailVerifForm.css";
import VerifTextArea from "./VerifTextArea";

function EmailVerifForm({ attrib = "email" }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    
    const params = new URLSearchParams(location.search);
    const { id } = useParams();
    // setEmail(location.state?.email);
    console.log(email);
    const [otp, setOTP] = useState("");

    useEffect(() => {
        setEmail(location.state?.email);
        console.log(email);
    }, [email]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp?.length < 5) {
            toast.error("OTP is not valid");
        } else {
            const verifyOTP = async (email , otp) => {
                await axios.post('/auth/verify', { email, otp })
                    .then((res) => {
                        console.log(res);
                        toast.success("OTP verified successfully");
                        res.data?.token && localStorage.setItem('token', res.data.token);
                        sessionStorage.setItem('user', JSON.stringify({_id:res.data?.id , role : res.data?.role , department : res.data?.department }));
                        if(res.data?.role === "admin") {
                            navigate("/admin/mcqs");
                            console.log("admin");
                            return;
                            
                        }else {
                            navigate("/quiz");
                            return;
                        }
                        
                    })
                    .catch((err) => {
                        toast.error("Failed to verify OTP");
                    });
            };
            verifyOTP(email , otp);
        }
    };

    useEffect(() => {
        console.log(otp);
    }, [otp]);

    return (
        <>
            <form onSubmit={handleSubmit} className="verify-form form auth-form">
                <div className="form-title">Verify {attrib}</div>
                <div className="verify-icon">
                    {attrib.toLowerCase() === 'email' ? "mail" : 
                    (attrib.toLowerCase() === 'phone' ? "phone" : "")}
                </div>
                <div className="verify-text">
                    <p>We have sent a verification code to your {attrib.toLowerCase()}. Please enter the code below to verify your account.</p>
                </div>
                <VerifTextArea setOTP={setOTP} />
                {/* Pass the handleSubmit function to IconButton's onClick */}
                <IconButton 
                    content={"Verify"} 
                    extraClass={"btn-borderw-1 btn-borderc-747775 btn-margin login-btn"}
                />
            </form>
            <div className="form-bottom-bar">
                <div>T&C</div>
                <div>Help</div>
                <div className="register-link">
                    <span>Register</span>
                    <span className="register__icon">arrow_forward</span>
                </div>
            </div>
        </>
    );
}

export default EmailVerifForm;
