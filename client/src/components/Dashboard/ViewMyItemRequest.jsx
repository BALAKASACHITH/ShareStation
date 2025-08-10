import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ViewMyItemRequest = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    
    const item = JSON.parse(localStorage.getItem("ViewMyItemRequest"));
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:2000/requests');
                const allRequests = response.data;
                const filteredRequests = allRequests.filter(request =>
                    request.itemName === item.itemName && request.to === item.to
                );
                setRequests(filteredRequests);
                console.log(filteredRequests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [item.itemName, item.to]);
    
    if (!item) return <Navigate to="/DashBoard/Yours" />
    
    const close = () => {
        localStorage.removeItem("ViewMyItemRequest");
        navigate("/DashBoard/Yours");
    }

    // Fetch all requests and filter
    
    return (
        <div className='ViewMyItemRequest'>
            <div className="ViewOtherItemTop" onClick={close}>Close</div>
            <div className="RequestsContainer">
                {requests.length === 0 ? (
                    <div className="NoRequests">No requests found for this item.</div>
                ) : (
                    <div className="RequestsList">
                        {requests.map((request) => (
                            <div key={request._id} className="RequestRow">
                                <div className="RequestInfo">
                                    <div className="RequestFrom">From: {request.from.split("@")[0]}</div>
                                    <div className="RequestDetails">
                                        <span>Days: {request.daysNeeded}</span>
                                        <span>Contact: {request.contact}</span>
                                        <span>Location: {request.location}</span>
                                        <span>MailId: {request.from}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewMyItemRequest;