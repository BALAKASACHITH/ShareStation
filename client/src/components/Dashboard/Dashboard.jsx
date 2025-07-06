import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import DHome from './DHome';
import DYours from './DYours';
import DAccount from './DAccount';
import DeveloperInfo from './DeveloperInfo';
export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sideOption,setSideOption]=useState("Home");
    if (!user) return <Navigate to="/Signin" />;
    const setWidth=()=>{
        setSidebarOpen(!sidebarOpen);
    }
    const renderMain=()=>{
        switch(sideOption){
            case "Home":return <DHome/>;
            case "Yours":return <DYours/>;
            case "Acccount":return <DAccount/>;
            case "DeveloperInfo":return <DeveloperInfo/>;
            default:return <DHome/>;
        }
    }
    return (
        <div className="Dashboard">
            <SideNav isOpen={sidebarOpen} toggle={setWidth} sideOption={sideOption} setSideOption={setSideOption} />
            <div className="MainWrapper">
                <TopNav isOpen={sidebarOpen} />
                <div className="MainArea">
                    {renderMain()}
                </div>
            </div>
        </div>
    );
}
