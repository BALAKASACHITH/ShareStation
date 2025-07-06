import { useState } from "react";
import Input from "./Input";
import Error from "./Error";
export default function YoursForm() {
    const [itemName, setItemName] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("abc");
    const handleSubmit = () => {
        if (!itemName || !rentPerDay || !image) {
            setError("All fields are required!");
            return;
        }
        console.log("Submitted:", { itemName, rentPerDay, image });
        setItemName("");
        setRentPerDay("");
        setImage(null);
    };
    return (
        <div className="YoursForm">
            <div className="addform">
                <div className="topform">
                    <Input label="Item Name" value={itemName} change={setItemName} />
                    <Input type="number" label="Rent Per Day (₹)" value={rentPerDay} change={setRentPerDay} />
                    <label className="fileUploadLabel">
                        {image ? `${image.name.length > 10 ? image.name.slice(0, 10) + "..." : image.name}` : "Upload Image"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="fileInputHidden"
                        />
                    </label>
                </div>
                <div className="botform">
                    <Error msg={error} setMessage={setError} />
                    <button className="myButton" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}
