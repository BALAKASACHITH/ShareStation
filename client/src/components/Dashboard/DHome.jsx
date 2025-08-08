import { useEffect,useState} from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';
import Item from "./Item";
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
                {
                    items.map((i,ind)=>{
                        return <Item key={ind+1} itemName={i.itemName.split("_")[0]} rent={i.rentPerDay} imgurl={`http://localhost:2000${i.imagePath}`} from={i.from}/>
                    })
                }
            </div>
        </div>
    )
}