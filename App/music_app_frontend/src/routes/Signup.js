import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TesxtInput';
import PasswordInput from '../components/shared/Password';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { makeUnaauthenticatedPOSTRequest } from '../utils/serverhelper';
import { useCookies } from 'react-cookie';


const Signupcomponent = () => {
    const [email, setEmail] = useState("");
    const [Confirmemail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [cookie ,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const Signup = async () => {
        if (email !== Confirmemail) {
            alert("Email must be same");
            return;
        }
        const data = {email, password, username, firstname, lastname};
        const response = await makeUnaauthenticatedPOSTRequest("/auth/register", data);
        if (response && !response.err){
            
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token,{path:"/" , expires: date} );
            alert("Success");
            navigate("/home")
        } else{
            alert("failure");
        }
        
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-2 border-b border-solid border-gray-200 w-full flex justify-center">
                {/* <Icon icon="fluent-emoji-high-contrast:skull" /> */}
                <Icon icon="simple-icons:iheartradio" width={80} />
            </div>
            <div className="input w-1/3 py-10 flex items-center justify-center flex-col">
                <div className='font-extrabold mb-4 text-xl'>
                    Signup for free to start listening.
                </div>
                <TextInput label="Enter your Email" placeholder="Enter your Email" className="my-6" value={email} setValue={setEmail} />
                <TextInput label="Confirm your Email" placeholder="Confirm your Email" className="mb-6" value={Confirmemail} setValue={setConfirmEmail} />
                <TextInput label="Enter Your Username" placeholder="Enter Your Username" className="mb-6" value={username} setValue={setUsername} />

                <PasswordInput label="Password" placeholder="Create a Password" value={password} setValue={setPassword} />
                <div className="w-full flex justify-between items-center space-x-8 ">
                    <div className="w-1/2">
                        <TextInput label="First Name" placeholder="Enter Your First Name" className="my-6" value={firstname} setValue={setFirstname} /></div>
                    <div className="w-1/2">
                        <TextInput label="Last Name" placeholder="Enter Your Last Name" className="my-6" value={lastname} setValue={setLastname} /></div>

                </div>

                <div className='w-full flex items-center justify-center my-8'>
                    <button className='bg-red-500  font-semibold p-3 px-10 rounded-full' onClick={(e) => { e.preventDefault(); Signup(); }}>
                        SIGN UP
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300">

                </div>
                <div className='my-6 font-bold text-lg'>
                    Already have an account?
                </div>
                <div className='border border-gray-400 text-gray-500 font-bold w-full flex items-center justify-center py-3 rounded-full'>
                    <Link to="/login">LOG IN INSTEAD</Link>
                </div>
            </div>
        </div>

    );
}

export default Signupcomponent;