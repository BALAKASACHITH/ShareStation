import logo1 from "../../../images/Logo1.png";
import {Link} from 'react-router-dom';
export default function Left(){
    return(
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="Left gradient-text">
                <img src={logo1} alt="Logo" className="Logo" />
                <h1>ShareStation</h1>
            </div>
        </Link>
    )
}