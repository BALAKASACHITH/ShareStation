import { useNavigate } from "react-router-dom";
const Item = ({key, itemName, rent, imgurl, from}) => {
    const navigate=useNavigate();
    const onView=()=>{
        localStorage.setItem("ViewOtherItem",JSON.stringify({itemName,rent,imgurl,from}));
        navigate("ViewOtherItem");
    }
    const onWant = () => {
        localStorage.setItem("WantItem", JSON.stringify({itemName, from}));
        navigate("WantForm");
    }
    return (
        <div key={key} className='Item'>
            <div
                className='ItemImage'
                style={{
                    backgroundImage: `url(${imgurl})`,
                }}
            >
            </div>
            <div className='ItemFooter'>
                <div className='ViewButton' onClick={onView}>
                    View
                </div>
                <div className='WantItButton' onClick={onWant}>
                    WantIt
                </div>
            </div>
        </div>
    )
}
export default Item;