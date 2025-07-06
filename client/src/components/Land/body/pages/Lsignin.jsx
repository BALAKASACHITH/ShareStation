import Input from './Input';
import Error from './Error';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState,useRef } from 'react';
export default function Lsignin(){
    const navigate=useNavigate();
    const [msg,setMessage]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const btnRef=useRef(null);
    const validate = async () => {
        btnRef.current.classList.add("disable");
        if (!email.trim()) {
            setMessage("Email is required");
            btnRef.current.classList.remove("disable");
            return;
        }
        if (!password.trim()) {
            setMessage("Password is required");
            btnRef.current.classList.remove("disable");
            return;
        }
        try{
            const res=await axios.post("http://localhost:2000/signin",{
                email:email,
                password:password
            })
            if(res.data.success){
                console.log(res.data);
                localStorage.clear();
                localStorage.setItem("user", JSON.stringify({
                    email: email,
                    name: res.data.name
                }));
                navigate("/Dashboard");
            }else{
                setMessage(res.data.message);
                btnRef.current.classList.remove("disable");
            }
        }catch(error){
            setMessage("!! Server Not Responding !!");
            console.error(error);
        }
    };
    return(
        <div className="Lsignin">
            <div className='topLsignin'>
                <Input label="Enter EmailId" value={email} change={setEmail}/>
                <Input label="Enter Password" value={password} change={setPassword} type='password'/>
            </div>
            <div className="botLsignin">
                <Error msg={msg} setMessage={setMessage} />
                <button ref={btnRef} className="myButton" onClick={validate}>Sign Up</button>
            </div>
        </div>
    )
}