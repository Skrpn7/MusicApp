// import './App.css';
import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/LoginComponent';
import Signupcomponent from "./routes/Signup";
import Homecomponent from "./routes/Home";
import { useCookies } from "react-cookie";
import Loggedinhomecomponent from "./routes/loggedinhomecomponent";
import Uploadsong from "./routes/uploadsong";
import Mymusic from "./routes/mymusic";


function App() {
  const [cookie ,setCookie] =useCookies(["token"]);
  console.log(cookie.token)

  return (
    <div className='w-screen h-screen font-font-poppins'>
      <BrowserRouter>
        {
          cookie.token?(
            //Logged in routes
            <Routes>
              <Route path='/home' element={<Loggedinhomecomponent />}></Route>
              <Route path="/uploadsong" element={<Uploadsong />}></Route>
              <Route path="/mymusic" element={<Mymusic />}></Route>
              <Route path="*" element={<Navigate to={"/home"} />} />
            </Routes>
          ):      
          //logged out routes        
        <Routes>
          <Route path='/login' element={<LoginComponent />}></Route>
          <Route path='/signup' element={<Signupcomponent />}></Route>
          <Route path='/home' element={<Homecomponent />}></Route>
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
