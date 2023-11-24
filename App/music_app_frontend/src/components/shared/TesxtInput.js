const TextInput = ({ label, placeholder, className, value, setValue,labelclassname }) => {
    return (
        <div className={`TextInput flex flex-col space-y-2 w-full ${className}`}>
            <label for={label} className={`font-bold ${labelclassname}`}>
                {label}
            </label>
            <input type="text" placeholder={placeholder}
                className="p-2 border-solid border-2 rounded placeholder-gray-500"
                id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }} />
        </div>
    );
}


export default TextInput;