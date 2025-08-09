import { useState } from "react";
import Input from "./Input";
import Error from "./Error";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WantForm = () => {
    const [daysNeeded, setDaysNeeded] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    
    const w = JSON.parse(localStorage.getItem("WantItem"));
    if(!w){
        navigate("/DashBoard");
        return;
    }

    const handleSubmit = async () => {
        buttonRef.current.classList.add("disable");
        if (!daysNeeded || !contact || !location) {
            setError("All fields are required!");
            buttonRef.current.classList.remove("disable");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const wantItem = JSON.parse(localStorage.getItem("WantItem"));
        const userEmail = user?.email;

        const requestData = {
            itemName: wantItem?.itemName,
            to: wantItem?.from,
            from: userEmail,
            daysNeeded: daysNeeded,
            contact: contact,
            location: location
        };

        console.log("Request Data:", requestData);
        
        try {
            await axios.post("http://localhost:2000/submitRequest", requestData);
            console.log("Request submitted successfully");
            setDaysNeeded("");
            setContact("");
            setLocation("");
            setError("");
            buttonRef.current.classList.remove("disable");
            setShowPopup(true);
            
            // Navigate to dashboard after 2 seconds
            setTimeout(() => {
                setShowPopup(false);
                localStorage.removeItem("WantItem");
                navigate("/DashBoard");
            }, 2000);
        } catch (err) {
            console.error("Error submitting request:", err);
            setError("Failed to submit request");
            buttonRef.current.classList.remove("disable");
        }
    };

    const close = () => {
        localStorage.removeItem("WantItem");
        navigate("/DashBoard");
    }

    return (
        <div className='WantForm'>
            <div className="ViewOtherItemTop" onClick={close}>Close</div>
            <div className="addform">
                <div className="topform">
                    <Input
                        type="number"
                        label="Need for how many days"
                        placeholder="Enter number of days needed"
                        value={daysNeeded}
                        change={setDaysNeeded}
                    />
                    <Input
                        label="Your Contact Number"
                        placeholder="Enter your phone number"
                        value={contact}
                        change={setContact}
                    />
                    <Input
                        label="Your Location"
                        placeholder="Enter your address/location"
                        value={location}
                        change={setLocation}
                    />
                </div>
                <div className="botform">
                    <Error msg={error} setMessage={setError} />
                    <button ref={buttonRef} className="myButton" onClick={handleSubmit}>Submit Request</button>
                </div>
            </div>
            {showPopup && (
                <div className="popupOverlay">
                    <div className="popupContent">
                        <div className="successIcon">✓</div>
                        <h2>Request Sent Successfully!</h2>
                        <p>Your rental request has been submitted.</p>
                        <div className="loadingDots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WantForm;