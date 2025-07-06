import { Navigate ,useNavigate} from "react-router-dom";
export default function SideNav({ isOpen, toggle,sideOption,setSideOption }) {
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate("/Signin");
    }
    const handleSelect = (option) => {
        setSideOption(option);
    };
    return (
        <div className={`SideNav ${isOpen ? 'open' : 'closed'}`}>
            <div className="topSideNav" >
                <div className="ToggleCircle" onClick={toggle}>
                    {isOpen?<i className="fa-solid fa-backward"></i>:<i className="fa-solid fa-forward"></i>}
                </div>
            </div>
            
            <div className="midSideNav">
                <div
                    className={`sideOption ${isOpen ? 'open' : 'closed'} ${sideOption === "Home" ? 'selected gradient-text' : 'notselected'}`}
                    onClick={() => handleSelect("Home")}
                >
                    <i className={`fa-solid fa-house ${sideOption !== "Home" ? "gradient-text" : "notselectedsidenavtext"}`}></i>
                    {isOpen && <span className={`opttext ${sideOption !== "Home" ? "gradient-text" : "notselectedsidenavtext"}`}>Home</span>}
                </div>

                <div
                    className={`sideOption ${isOpen ? 'open' : 'closed'} ${sideOption === "Yours" ? 'selected gradient-text' : 'notselected'}`}
                    onClick={() => handleSelect("Yours")}
                >
                    <i className={`fa-solid fa-box-open ${sideOption !== "Yours" ? "gradient-text" : "notselectedsidenavtext"}`}></i>
                    {isOpen && <span className={`opttext ${sideOption !== "Yours" ? "gradient-text" : "notselectedsidenavtext"}`}>Yours</span>}
                </div>

                <div
                    className={`sideOption ${isOpen ? 'open' : 'closed'} ${sideOption === "Account" ? 'selected gradient-text' : 'notselected'}`}
                    onClick={() => handleSelect("Account")}
                >
                    <i className={`fa-solid fa-user ${sideOption !== "Account" ? "gradient-text" : "notselectedsidenavtext"}`}></i>
                    {isOpen && <span className={`opttext ${sideOption !== "Account" ? "gradient-text" : "notselectedsidenavtext"}`}>Account</span>}
                </div>

                <div
                    className={`sideOption ${isOpen ? 'open' : 'closed'} ${sideOption === "DeveloperInfo" ? 'selected gradient-text' : 'notselected'}`}
                    onClick={() => handleSelect("DeveloperInfo")}
                >
                    <i className={`fa-solid fa-code ${sideOption !== "DeveloperInfo" ? "gradient-text" : "notselectedsidenavtext"}`}></i>
                    {isOpen && <span className={`opttext ${sideOption !== "DeveloperInfo" ? "gradient-text" : "notselectedsidenavtext"}`}>Developers</span>}
                </div>
            </div>

            <div className="botSideNav" >
                <div className={`logout ${isOpen?'open':'closed'}`}  onClick={logout}>
                    <i className="gradient-text fa-solid fa-right-from-bracket"></i>
                    {isOpen && <span className="opttext gradient-text">Logout</span>}
                </div>
            </div>
        </div>
    );
}