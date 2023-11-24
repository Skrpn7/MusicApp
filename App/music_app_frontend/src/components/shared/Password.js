const PasswordInput = ({ label, placeholder,value,setValue }) => {
    return (
        <div className="TextInput flex flex-col space-y-2 w-full">
            <label for={label} className="font-bold">
                {label}
            </label>
            <input type="password" placeholder={placeholder} className="p-2 border-solid border-2 rounded placeholder-gray-500" id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }} />
        </div>
    );
}


export default PasswordInput;