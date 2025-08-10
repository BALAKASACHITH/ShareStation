import { useState ,useEffect} from 'react';
import { Navigate,useNavigate,Routes,Route } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import DHome from './DHome';
import DYours from './DYours';
import DAccount from './DAccount';
import DeveloperInfo from './DeveloperInfo';
export default function Dashboard() {
    const navigate=useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sideOption, setSideOption] = useState(() => {
        const path = location.pathname;
        if (path.startsWith('/DashBoard/Yours/ViewMyItemRequest')) return "YoursViewMyItemRequest";
        if (path.startsWith('/DashBoard/Yours/ViewMyItem')) return "YoursViewMyItem";
        if (path.startsWith('/DashBoard/Yours')) return "Yours";
        if (path.startsWith('/DashBoard/Account')) return "Account";
        if (path.startsWith('/DashBoard/DeveloperInfo')) return "DeveloperInfo";
        return "Home";
    });

    useEffect(() => {
        const renderMain = () => {
            switch(sideOption) {
                case "Home": navigate("/DashBoard"); break;
                case "Yours": navigate("/DashBoard/Yours"); break;
                case "YoursViewMyItem": navigate("/DashBoard/Yours/ViewMyItem"); break;
                case "YoursViewMyItemRequest": navigate("/DashBoard/Yours/ViewMyItemRequest"); break;
                case "Account": navigate("/DashBoard/Account"); break;
                case "DeveloperInfo": navigate("/DashBoard/DeveloperInfo"); break;
                default: return <DHome/>;
            }
        }
        renderMain();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sideOption]);

    if (!user) return <Navigate to="/Signin" />;
    const setWidth=()=>{
        setSidebarOpen(!sidebarOpen);
    }
    return (
        <div className="Dashboard">
            <SideNav isOpen={sidebarOpen} toggle={setWidth} sideOption={sideOption} setSideOption={setSideOption} />
            <div className="MainWrapper">
                <TopNav isOpen={sidebarOpen} />
                <div className="MainArea">
                    <Routes>
                        <Route path='/*' element={<DHome/>} />
                        <Route path='/Yours/*' element={<DYours/>} />
                        <Route path='/Account/*' element={<DAccount/>} />
                        <Route path='/DeveloperInfo/*' element={<DeveloperInfo/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}