import Input from './Input';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Error from "./Error";
import { useNavigate } from 'react-router-dom';
export default function Rsignup(){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [otp,setOtp]=useState("");
    const [msg,setMessage]=useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const takeDiv = document.querySelector(".Take");
    const verifyDiv = document.querySelector(".Verrify");
    const passwordDiv = document.querySelector(".Password");
    useEffect(() => {
        const takeDiv = document.querySelector(".Take");
        const verifyDiv = document.querySelector(".Verrify");
        const passwordDiv = document.querySelector(".Password");
        takeDiv.style.display = "flex";
        verifyDiv.style.display = "none";
        passwordDiv.style.display = "none";
    }, []);
    const validate1 = async () => {
        const btn=document.querySelector(".myButton");
        btn.classList.add("disable");
        if (!name.trim() && !email.trim()) {
            setMessage("Username and Email are required.");
            btn.classList.remove("disable");
        } else if (!name.trim()) {
            setMessage("Username is required.");
            btn.classList.remove("disable");
        } else if (!email.trim()) {
            setMessage("Email is required.");
            btn.classList.remove("disable");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage("Invalid email format.");
            btn.classList.remove("disable");
        } else {
            try {
                const res = await axios.post("http://localhost:2000/checkuser", {
                    username: name,
                    email: email
                });
                if (res.data.exists) {
                    setMessage("User already exists with this email.");
                    btn.classList.remove("disable");
                } else {
                    setMessage("");
                    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
                    try{
                        const res=await axios.post("http://localhost:2000/updateotp",{
                            email:email,
                            otp:otp
                        })
                        if(res.data.sent){
                            setMessage("");
                            btn.classList.remove("disable");
                            takeDiv.style.display = "none";
                            verifyDiv.style.display = "flex";
                            passwordDiv.style.display = "none";
                        }
                    }catch(error){
                        setMessage("Failed to send otp");
                        btn.classList.remove("disable");
                        console.error(error);
                    }
                }
            } catch (error) {
                setMessage("Server error occurred. Please try again.");
                btn.classList.remove("disable");
                console.log(error);
            }
        }
    };
    const validate2 = async () => {
        const btn=document.querySelector(".myButton");
        btn.classList.add("disable");
        if (!otp.trim()) {
            setMessage("OTP is required.");
            btn.classList.remove("disable");
        } else if (!/^\d{6}$/.test(otp)) {
            setMessage("OTP must be a 6-digit number.");
            btn.classList.remove("disable");
        } else {
            setMessage("");
            try{
                const res=await axios.post("http://localhost:2000/verify-otp",{
                    email:email,
                    otp:otp
                })
                if(res.data.matched){        
                    btn.classList.remove("disable");
                    takeDiv.style.display = "none";
                    verifyDiv.style.display = "none";
                    passwordDiv.style.display = "flex";
                }else{
                    setMessage("!! wrong otp !!")
                    btn.classList.remove("disable");
                }
            }catch(error){
                console.error(error);
                btn.classList.remove("disable");
                setMessage("!! error in verifying otp !!");
            }
        }
    };
    const validate3 = async () => {
        const btn = document.querySelector(".myButton");
        btn.classList.add("disable");
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        if (!password.trim() || !confirmPassword.trim()) {
            setMessage("Both password fields are required.");
            btn.classList.remove("disable");
        } else if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            btn.classList.remove("disable");
        } else if (password.length < 8) {
            setMessage("Password must be at least 8 characters.");
            btn.classList.remove("disable");
        } else if (!hasUpperCase || !hasNumber || !hasSpecial) {
            let missing = [];
            if (!hasUpperCase) missing.push("1 uppercase letter");
            if (!hasNumber) missing.push("1 number");
            if (!hasSpecial) missing.push("1 special character");
            setMessage("Password must contain at least: " + missing.join(", ") + ".");
            btn.classList.remove("disable");
        } else {
            setMessage("");
            console.log("Name:",name);
            console.log("Email:", email);
            console.log("Password:", password);
            try{
                const res=await axios.post("http://localhost:2000/signup",{
                    name:name,
                    email:email,
                    password:password
                })
                if(res.data.success){
                    localStorage.clear();
                    localStorage.setItem("user", JSON.stringify({
                        email: email,
                        name: name
                    }));
                    navigate("/Dashboard");
                }else{
                    setMessage("somethign went wrong try again");
                    btn.classList.add("disable");
                }
            }catch(error){
                setMessage("unable to create account please try again");
                btn.classList.add("disable");
                console.error(error);
            }
        }
    };
    return(
        <div className="Rsignup">
            <div className="Take">
                <Input label="Enter Username" value={name} change={setName}/>
                <Input label="Enter emailId" value={email} change={setEmail}/>
                <Error msg={msg} setMessage={setMessage}/>
                <button className="myButton" onClick={validate1}>Verrify Maild</button>
            </div>
            <div className="Verrify">
                <Input label="Enter otp" value={otp} change={setOtp}/>
                <div className="botVerrify">
                    <Error msg={msg} setMessage={setMessage}/>
                    <button className="myButton" onClick={validate2} >Verrify Otp</button>
                </div>
            </div>
            <div className="Password">
                <div className="topPassword">
                    <Input label="Enter Password" value={password} change={setPassword} />
                    <Input label="Confirm Password" value={confirmPassword} change={setConfirmPassword} />
                </div>
                <div className="botPassword">
                    <Error msg={msg} setMessage={setMessage} />
                    <button className="myButton" onClick={validate3}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}