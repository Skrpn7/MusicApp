import iheartradio from "../assests/images/iheartradio.png";
import Texthover from "../components/shared/Texthover";
import Icontext from "../components/shared/icontext";
import { Icon } from '@iconify/react';
import Playview from "../components/shared/playlistview";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Howl, Howler } from 'howler';
import { useContext } from "react";
import SongContext from "../contexts/songcontext";
import Createplaylistmodal from "../modals/Createplaylistmodal";
import Addtoplaylistmodal from "../modals/Addtoplaylistmodal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverhelper";




const focuscardsdata = [{
    title: "Taylor Swift",
    description: "Best Of Taylor Swift",
    imgurl: "https://people.com/thmb/bnv58OSnUSsOsnwP_c9f85fBdv0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(992x0:994x2)/taylor-swift7-2000-48f9bfb372c34e36866773b1ede0b372.jpg"
},
{
    title: "Selena Gomez",
    description: "Best Of Selena Gomez",
    imgurl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Selena_Gomez_-_For_You_%28Official_Album_Cover%29.png"
},
{
    title: "Ariana Grande",
    description: "Best Of Ariana Grande",
    imgurl: "https://upload.wikimedia.org/wikipedia/en/a/a0/Ariana_Grande_-_Positions.png"
},
{
    title: "Lana Del Rey",
    description: "Best Of Lana Del Rey",
    imgurl: "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png"
},
{
    title: "Pitbull",
    description: "Best Of Pitbull",
    imgurl: "https://studiodiscography.files.wordpress.com/2019/10/2004-8-m.i.a.m.i..jpg"
}]


const LoggedinContainer = ({ children, currentactivescreen }) => {

    const [Createplaylistmodalopen, setCreateplaylistmodalopen] = useState(false);
    const [Addtoplaylistmodalopen, setAddtoplaylistmodalopen] = useState(false);

    const { currentSong, setCurrentSong, SoundPlayed, SetSoundPlayed, Ispaused, setIspaused } = useContext(SongContext);
    console.log(currentSong);

    const firstupdate = useRef(true);

    useLayoutEffect(() => {
        if (firstupdate.current) {
            firstupdate.current = false;
            return;
        }
        if (!currentSong) {
            return
        }
        changeSong(currentSong.track);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track])


    const addSongtoplaylist = async (playlistId)=>{

        const songId = currentSong._id
        const payload = {playlistId,songId}
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload)
        if(response._id){
            setAddtoplaylistmodalopen(false)
        }
    }

    const playSound = () => {
        if (!SoundPlayed) {
            return
        }
        SoundPlayed.play();
    }

    const changeSong = (Songsrc) => {
        if (SoundPlayed) {
            SoundPlayed.stop();
        }
        let sound = new Howl({
            src: [Songsrc],
            html5: true
        });
        SetSoundPlayed(sound)
        sound.play();
        setIspaused(false)
    }

    const pauseSound = () => {
        SoundPlayed.pause()
    }

    const toggleplaypause = () => {
        if (Ispaused) {
            playSound()
            setIspaused(false);
        } else {
            pauseSound();
            setIspaused(true);
        }
    }

    return (
        <div className="h-full w-full bg-app-black ">
            
            
            
            {Createplaylistmodalopen && <Createplaylistmodal closemodal={() => { setCreateplaylistmodalopen(false) }} />}


            {Addtoplaylistmodalopen &&<Addtoplaylistmodal closemodal={()=>{setAddtoplaylistmodalopen(false)}} addSongtoplaylist= {addSongtoplaylist} /> }



            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    {/* div for logo */}
                    <div>
                        <div className="p-6  ">
                            <img src={iheartradio} alt="iheartlogo" width={300} />
                            {/* <Icon icon="simple-icons:iheartradio" color="red" width={80} /> */}
                        </div>
                        <div className="py-3">
                            <Icontext iconName={"line-md:home-simple-filled"} displaytext="Home" hFlip="flase" targetlink={"/home"} active={currentactivescreen === "home"} />
                            <Icontext iconName={"line-md:search-twotone"} displaytext="Search" hFlip="true" targetlink={"/search"} active={currentactivescreen === "search"} />
                            <Icontext iconName={"fluent:library-28-filled"} displaytext="Library" hFlip="false" targetlink={"/library"} active={currentactivescreen === "library"} />
                            <Icontext iconName={"mdi:folder-music"} displaytext="My Music" hFlip="false" targetlink={"/mymusic"} active={currentactivescreen === "mymusic"} />
                        </div>
                        <div className="pt-7">
                            <Icontext iconName={"line-md:plus-square"} displaytext="Create a playlist" hFlip="false" onClick={() => { setCreateplaylistmodalopen(true) }} />
                            <Icontext iconName={"noto:red-heart"} displaytext="Liked Songs" hFlip="false" />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-500 text-white w-2/5 flex items-center justify-center rounded-full px-2 py-1 text-sm font-semibold hover:border-white cursor-pointer">
                            <Icon icon="bi:globe" />
                            <div className="ml-2">
                                English
                            </div>
                        </div>
                    </div>
                </div>
                {/* remaining part of the body */}
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    {/* navbar div */}
                    <div className="navbar bg-black w-full h-1/10 bg-opacity-50 flex items-center justify-end ">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <Texthover displaytext={"Premium"} />
                                <Texthover displaytext={"Support"} />
                                <Texthover displaytext={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>

                            <div className="w-1/3 flex justify-around items-center">
                                <Texthover displaytext={"Upload Songs"} />
                                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                    SD
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* content div */}
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {/* player  */}

            {currentSong && (
                <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">

                    <div className="w-1/4 flex items-center">
                        <img src={currentSong.Thumbnail} alt="CurrentSongThumbnail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.name}
                            </div>

                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.artist.firstname + " " + currentSong.artist.lastname}
                            </div>
                        </div>
                    </div>{/* left side of the player */}

                    <div className="w-1/2 flex justify-center h-full flex-col items-center" >
                        <div className="flex w-1/4 justify-between items-center">
                            {/* control goes here */}
                            <Icon icon="mdi:shuffle" fontSize={27} className="cursor-pointer text-gray-400 hover:text-white" />
                            <Icon icon="mdi:skip-previous" fontSize={30} className="cursor-pointer text-gray-400 hover:text-white" />
                            <Icon icon={Ispaused ? "mdi:play-circle" : "mdi:pause-circle"} fontSize={45} className="cursor-pointer text-gray-400 hover:text-white"
                                onClick={toggleplaypause} />
                            <Icon icon="mdi:skip-next" fontSize={30} className="cursor-pointer text-gray-400 hover:text-white" />
                            <Icon icon="ph:repeat" fontSize={27} className="cursor-pointer text-gray-400 hover:text-white" />

                        </div>
                        <div>
                            {/* seek bar */}
                            
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end items-center">
                        <Icon icon="ic:sharp-playlist-add" fontSize={27} className="cursor-pointer text-gray-400 hover:text-white"
                        
                        onClick={()=>{
                            setAddtoplaylistmodalopen(true);
                        }}
                        />
                        <Icon icon="icon-park-outline:like" fontSize={24} className="cursor-pointer text-gray-400 hover:text-white"/>
                    </div>

                </div>
            )}
        </div>
    );
};


export default LoggedinContainer;