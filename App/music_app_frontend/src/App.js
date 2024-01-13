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
import SongContext from "./contexts/songcontext";
import { useState } from "react";
import Searchpage from "./routes/Searchpage";
import Library from "./routes/library";
import Singleplaylistview from "./routes/Singleplaylistview";


function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token)
  const [currentSong, setCurrentSong] = useState(null)

  const [SoundPlayed, SetSoundPlayed] = useState(null)
  const [Ispaused, setIspaused] = useState(true)

  return (
    <div className='w-screen h-screen font-font-poppins'>
      <BrowserRouter>
        {
          cookie.token ? (
            //Logged in routes
            <SongContext.Provider value={{ currentSong, setCurrentSong, SoundPlayed, SetSoundPlayed, Ispaused, setIspaused }}>
              <Routes>
                <Route path='/home' element={<Loggedinhomecomponent />}></Route>
                <Route path="/uploadsong" element={<Uploadsong />}></Route>
                <Route path="/mymusic" element={<Mymusic />}></Route>
                <Route path="/search" element={<Searchpage />}></Route>
                <Route path="/library" element={<Library />}></Route>
                <Route path="/playlist/:playlistid" element={<Singleplaylistview />}></Route>
                <Route path="*" element={<Navigate to={"/home"} />} />
              </Routes>
            </SongContext.Provider>
          ) :
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
