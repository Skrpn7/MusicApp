import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Icontext = ({ iconName, displaytext, active, hFlip,targetlink,onClick }) => {
    return (
        <Link to={targetlink} className="block">
        <div className="flex items-center justify-start cursor-pointer " onClick={onClick}>
            <div className="px-5 py-4">
                <Icon icon={iconName} color={active ? "white" : "gray"} fontSize={30} hFlip={hFlip} />
            </div>

            <div className={`${active ? "text-white" : "text-gray-400"} text-sm font-semibold hover:text-white hover:text-lg`}>
                {displaytext}
            </div>
        </div>
        </Link>
    );
};

export default Icontext;