import { useNavigate, Navigate } from "react-router-dom";

const ViewMyItem = () => {
    const navigate = useNavigate();
    const item = JSON.parse(localStorage.getItem("ViewMyItem"));
    
    if (!item) return <Navigate to="/DashBoard/Yours" />
    
    const close = () => {
        localStorage.removeItem("ViewMyItem");
        navigate("/DashBoard/Yours");
    }
    
    return (
        <div className='ViewOtherItem'>
            <div className="ViewOtherItemTop" onClick={close}>Close</div>
            <div className="ViewOtherItemBot">
                <h3>Name : {item.itemName.split("_")[0]}</h3>
                <h3>RentPerDay : {item.rent}</h3>
                <h3>Owner : {item.from}</h3>
                <h3>Image : <a target="_blank" href={item.imgurl}>Click Here</a></h3>
            </div>
        </div>
    )
}

export default ViewMyItem;