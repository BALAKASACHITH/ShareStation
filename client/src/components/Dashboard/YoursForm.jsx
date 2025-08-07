import { useState } from "react";
import Input from "./Input";
import Error from "./Error";
import axios from "axios";
import { useRef } from "react";
export default function YoursForm() {
    const [itemName, setItemName] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("abc");
    const buttonRef=useRef(null);

const handleSubmit = async () => {
    buttonRef.current.classList.add("disable");
    if (!itemName || !rentPerDay || !image) {
        setError("All fields are required!");
        buttonRef.current.classList.remove("disable");
        return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;
    const formData = new FormData();
    formData.append("from",email);
    formData.append("itemName", `${itemName}_${email}`);
    formData.append("rentPerDay", rentPerDay);
    formData.append("image", image);
    console.log(formData);
    try {
        await axios.post("http://localhost:2000/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Data submitted");
        setItemName("");
        setRentPerDay("");
        setImage(null);
        setError("Done");
        buttonRef.current.classList.remove("disable");
    } catch (err) {
        console.error("Error uploading data", err);
        setError("Failed to submit data");
        buttonRef.current.classList.remove("disable");
    }
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
                    <button ref={buttonRef} className="myButton" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}
