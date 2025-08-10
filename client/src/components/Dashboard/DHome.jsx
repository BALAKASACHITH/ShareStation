import { useEffect,useState} from "react";
import axios from "axios";
import {Navigate,Routes,Route} from 'react-router-dom';
import Item from "./Item";
import AllItems from "./AllItems";
import ViewOtherItem from "./ViewOtherItem";
import WantForm from "./WantForm";
export default function DHome(){
    const details=JSON.parse(localStorage.getItem("user"));
    let [items,setItems]=useState([]);
    const userName=details.name;
    useEffect(()=>{
        const fetchData=async ()=>{
            const email=JSON.parse(localStorage.getItem("user")).email;
            try{
                const res=await axios.get("http://localhost:2000/getItem");
                let data=res.data.d;
                data=data.filter((u)=>{
                    return u.from!=email;
                });
                setItems(data);
            }catch(e){
                alert(e);
            }
        }
        fetchData();
    },[]);
    if(!details) return <Navigate to="/Signin"/>;
    return(
        <div className="DHome">
            <div className="DHomeTop">
                <h2>Hello {userName} Hope You Have A Great Time Ahead !!</h2>
            </div>
            <div className="DHomeBot">
                <Routes>
                    <Route path="/*" element={<AllItems items={items}/>} />
                    <Route path="/ViewOtherItem/*" element={<ViewOtherItem/>} />
                    <Route path="/WantForm/*" element={<WantForm/>} />
                </Routes>
            </div>
        </div>
    )
}