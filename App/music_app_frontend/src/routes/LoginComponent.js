import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TesxtInput';
import PasswordInput from '../components/shared/Password';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { makeUnaauthenticatedPOSTRequest } from '../utils/serverhelper';
import { useCookies } from 'react-cookie';


const LoginComponent = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies ,setCookie] = useCookies("token")
    const navigate = useNavigate();

    const login = async () => {
        const data = { email, password };
        const response = await makeUnaauthenticatedPOSTRequest("/auth/login", data);
        if (response && !response.err) {

            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, { path: "/", expires: date });
            alert("Success");
            navigate("/home")
        } else {
            alert("failure");
        }

    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-2 border-b border-solid border-gray-200 w-full flex justify-center">
                {/* <Icon icon="fluent-emoji-high-contrast:skull" /> */}
                <Icon icon="simple-icons:iheartradio" width={80} />
            </div>
            <div className="input w-1/4 py-10 flex items-center justify-center flex-col">
                <div className='font-bold mb-4'>
                    To Continue,login in.
                </div>
                <TextInput label="Email address or Username" placeholder="EmailID or Username" className="my-6" value={email} setValue={setEmail} />

                <PasswordInput label="Password" placeholder="Password" value={password} setValue={setPassword} />
                <div className='w-full flex items-center justify-end my-8'>
                    <button className='bg-red-500  font-semibold p-3 px-10 rounded-full' onClick={(e) =>{
                        e.preventDefault();
                        login();
                    }}>
                        LOG IN
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300">

                </div>
                <div className='my-6 font-bold text-lg'>
                    Don't have an account?
                </div>
                <div className='border border-gray-400 text-gray-500 font-bold w-full flex items-center justify-center py-3 rounded-full'>
                    <Link to="/signup">SIGN UP FOR iHEART</Link>
                </div>
            </div>
        </div>

    );
}

export default LoginComponent;