import { useState } from "react";
import YoursCmp from "./YoursCmp";
import YoursForm from "./YoursForm";

export default function DYours() {
    const [active, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!active);
    };
    return (
        <div className="DYours">
            <div className="DYoursTop">
                <div className={`Additem ${active?`back`:'add'}`} onClick={toggleActive}>
                    {active ? "←Back" : "+ Add"}
                </div>
            </div>
            <div className="DYoursBot">
                {active ? <YoursForm /> : <YoursCmp />}
            </div>
        </div>
    );
}
