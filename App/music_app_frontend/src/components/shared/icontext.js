import { Icon } from "@iconify/react";

const Icontext = ({ iconName, displaytext, active, hFlip }) => {
    return (
        <div className="flex items-center justify-start cursor-pointer ">
            <div className="px-5 py-4">
                <Icon icon={iconName} color={active ? "white" : "gray"} fontSize={30} hFlip={hFlip} />
            </div>

            <div className={`${active ? "text-white" : "text-gray-400"} text-sm font-semibold hover:text-white hover:text-lg`}>
                {displaytext}
            </div>
        </div>
    );
};

export default Icontext;