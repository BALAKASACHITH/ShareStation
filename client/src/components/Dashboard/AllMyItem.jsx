import MyItem from "./MyItem";

const AllMyItem = ({items,active,toggleActive}) => {
    return (
        <div className="AllMyItem">
            <div className={`Additem ${active?`back`:'add'}`} onClick={toggleActive}>
                    {active ? "Back" : "Add"}
            </div>
            <div className="AllMyItemMain" >
                {
                items.map((i,ind)=>{
                    return <MyItem key={ind+1} itemName={i.itemName} rent={i.rentPerDay} imgurl={`http://localhost:2000${i.imagePath}`} from={i.from}/>
                })
            }
            </div>
        </div>
    )
}
export default AllMyItem;