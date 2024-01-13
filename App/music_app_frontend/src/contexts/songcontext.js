import { createContext } from "react";


const SongContext = createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=>{},
    SoundPlayed:null, 
    SetSoundPlayed:()=>{},
    Ispaused:null, 
    setIspaused:()=>{},
});

export default SongContext;