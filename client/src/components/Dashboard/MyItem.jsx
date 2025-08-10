import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyItem = ({key, itemName, rent, imgurl, from}) => {
    const navigate = useNavigate();
    
    const onView = () => {
        localStorage.setItem("ViewMyItem", JSON.stringify({itemName, rent, imgurl, from}));
        navigate("ViewMyItem");
    }
    
    const onWant = () => {
        localStorage.setItem("ViewMyItemRequest", JSON.stringify({itemName, to: from}));
        navigate("ViewMyItemRequest");
    }

    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
            try {
                await axios.delete("http://localhost:2000/delete-item", {
                    data: { itemName, from }
                });
                window.location.reload();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete item. Please try again.");
            }
        }
    }
    
    return (
        <div key={key} className='MyItem'>
            <div
                className='MyItemImage'
                style={{
                    backgroundImage: `url(${imgurl})`,
                }}
            >
            </div>
            <div className='MyItemFooter'>
                <div className='MyViewButton' onClick={onView}>
                    View
                </div>
                <div className='MyWantItButton' onClick={onWant}>
                    Requests
                </div>
                <div className='DeleteButton' onClick={onDelete}>
                    🗑️
                </div>
            </div>
        </div>
    )
}

export default MyItem;