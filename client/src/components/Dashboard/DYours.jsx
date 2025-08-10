import { useState,useEffect } from "react";
import YoursCmp from "./YoursCmp";
import YoursForm from "./YoursForm";
import axios from "axios";
export default function DYours() {
    const [active, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!active);
    };
    let [items,setItems]=useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
            const email=JSON.parse(localStorage.getItem("user")).email;
            try{
                const res=await axios.get("http://localhost:2000/getItem");
                let data=res.data.d;
                data=data.filter((u)=>{
                    return u.from==email;
                });
                setItems(data);
            }catch(e){
                alert(e);
            }
        }
        fetchData();
    },[]);
    return (
        <div className="DYours">
            {active ? <YoursForm  active={active} toggleActive={toggleActive} /> : <YoursCmp items={items} active={active} toggleActive={toggleActive} />}
        </div>
    );
}