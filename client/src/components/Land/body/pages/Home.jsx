import {useEffect} from 'react';
import axios from 'axios';
export default function Home(){
    const getMessage=async ()=>{
        try {
            const res = await axios.get("http://localhost:2000/");
            console.log(res.data); // prints: hello how are you
        } catch (error) {
            console.error("Error fetching message:", error.message);
        }
    }
    useEffect(()=>{
        getMessage();
    },[])
    return(
        <div>home</div>
    )
}