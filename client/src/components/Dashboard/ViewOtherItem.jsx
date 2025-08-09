import { Navigate,useNavigate } from "react-router-dom";
const ViewOtherItem = () => {
    const navigate=useNavigate();
    const item=JSON.parse(localStorage.getItem("ViewOtherItem"));
    if(!item) return <Navigate to="/DashBoard" />
    const close=()=>{
        localStorage.removeItem("ViewOtherItem");
        navigate("/DashBoard");
    }
    return (
        <div className='ViewOtherItem'>
            <div className="ViewOtherItemTop" onClick={close}>Close</div>
            <div className="ViewOtherItemBot">
                <h3>Name : {item.itemName}</h3>
                <h3>RentPerDay : {item.rent}</h3>
                <h3>Owner :{item.from}</h3>
                <h3>Image : <a target="_blank" href={item.imgurl} >Click Here</a></h3>
            </div>
        </div>
    )
}
export default ViewOtherItem;