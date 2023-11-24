
const Texthover = ({ displaytext, active }) => {
    return (
        <div className="flex items-center justify-start cursor-pointer ">
            <div className={`${active ? "text-white" : "text-gray-400"} text-lg font-semibold hover:text-white`}>
                {displaytext}
            </div>
        </div>
    );
};

export default Texthover;