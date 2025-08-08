import { useEffect,useState} from "react";
import axios from "axios";
import {Navigate} from 'react-router-dom';
export default function DHome(){
    const details=JSON.parse(localStorage.getItem("user"));
    let [items,setItems]=useState([]);
    const userName=details.name;
    const userEmail=details.email;
    useEffect(()=>{
        const fetchData=async ()=>{
            const email=JSON.parse(localStorage.getItem("user")).email;
            try{
                const res=await axios.get("http://localhost:2000/getItem");
                let data=res.data.d;
                data=data.filter((u)=>{
                    return u.email!=email;
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
            <h1>Current User Name : {userName}</h1>
            <h1>Current User Email : {userEmail}</h1>
            <hr/>
            <hr/>
            {
                items.map((i,ind)=>{
                    return <div key={ind}>
                        <h2>Item Name: {i.itemName.split("_")[0]}</h2>
                        <h3>Rent Per Day : {i.rentPerDay}</h3>
                        <h3>Image :
                            <a
                                target="_blank"
                                href={`http://localhost:2000${i.imagePath}`} 
                                rel="noopener noreferrer"
                            >
                                Click Here To See
                            </a>
                        </h3>
                        <h3>Item From : {i.from}</h3>
                        <hr />
                    </div>
                })
            }
        </div>
    )
}