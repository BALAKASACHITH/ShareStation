import logo1 from "../../images/Logo1.png";
export default function TopNav({ isOpen }) {
    return (
        <div className={`TopNav ${isOpen ? 'open' : 'closed'}`}>
            <img src={logo1} alt="Logo" className="Logo" />
            <h1 className="gradient-text">ShareStation</h1>
        </div>
    );
}
