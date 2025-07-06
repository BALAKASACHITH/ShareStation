import { useEffect, useState } from 'react';
import SignupImg from '../../../../images/Signup.png';

export default function Lsignup() {
    const fullText = 'SignIn To Skip hassles';
    const [index,setIndex]=useState(0);
    const [displayText,setDisplayText]=useState("");
    useEffect(()=>{
        setTimeout(()=>{     
            const present=fullText.slice(0,index+1);
            setDisplayText(present);
            setIndex((index+1)%fullText.length);
        },400);
    },[index]);
    return (
        <div className="Lsignup">
            <img src={SignupImg} alt="sidepic" />
            <h1 className="gradient-text">{displayText}</h1>
        </div>
    );
}
