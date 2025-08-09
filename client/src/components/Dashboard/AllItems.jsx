import Item from "./Item";
const AllItems = ({items}) => {
    return (
        <div className="DHomeBotAll">
            {
                items.map((i,ind)=>{
                    return <Item key={ind+1} itemName={i.itemName} rent={i.rentPerDay} imgurl={`http://localhost:2000${i.imagePath}`} from={i.from}/>
                })
            }
        </div>
    )
}
export default AllItems;