import { useEffect, useState } from 'react';
import SigninImg from '../../../../images/Signin.png'

export default function Rsignin() {
    const fullText = 'Welcome To ShareStation';
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
        <div className="Rsignin">
            <img src={SigninImg} alt="sidepic" />
            <h1 className="gradient-text">{displayText}</h1>
        </div>
    );
}
