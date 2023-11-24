import iheartradio from "../assests/images/iheartradio.png";
import Texthover from "../components/shared/Texthover";
import Icontext from "../components/shared/icontext";
import { Icon } from '@iconify/react';
import SingleSongcard from "../components/shared/SingleSongcard";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverhelper";
import { useEffect } from "react";
import {Howl, Howler} from 'howler';


// const focuscardsdata = [{
//     title: "Taylor Swift",
//     description: "Best Of Taylor Swift",
//     imgurl: "https://people.com/thmb/bnv58OSnUSsOsnwP_c9f85fBdv0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(992x0:994x2)/taylor-swift7-2000-48f9bfb372c34e36866773b1ede0b372.jpg"
// },
// {
//     title: "Selena Gomez",
//     description: "Best Of Selena Gomez",
//     imgurl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Selena_Gomez_-_For_You_%28Official_Album_Cover%29.png"
// },
// {
//     title: "Ariana Grande",
//     description: "Best Of Ariana Grande",
//     imgurl: "https://www.udiscovermusic.com/wp-content/uploads/2019/05/Ariana-Grande-Dangerous-Woman-album-cover-web-optimised-820-820x820.jpg"
// },
// {
//     title: "Lana Del Rey",
//     description: "Best Of Lana Del Rey",
//     imgurl: "https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png"
// },
// {
//     title: "Pitbull",
//     description: "Best Of Pitbull",
//     imgurl: "https://studiodiscography.files.wordpress.com/2019/10/2004-8-m.i.a.m.i..jpg"
// }]




const Mymusic = () => {
    const [SongData, SetSongdata] = useState([])
    const [SoundPlayed, SetSoundPlayed] = useState(null)


    useEffect(()=>{
        const getdata = async()=> {
            const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
            SetSongdata(response.data);
        };
        getdata();
    }, []);

   const playSound = (Songsrc)=> {
    if(SoundPlayed){
        SoundPlayed.stop();
    }
    let sound = new Howl({
        src: [Songsrc],
        html5: true
      });
      SetSoundPlayed(sound)
      sound.play();
   }

    
    return (
        <div className="h-full w-full flex">
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                {/* div for logo */}
                <div>
                    <div className="p-6  ">
                        <img src={iheartradio} alt="iheartlogo" width={300} />
                        {/* <Icon icon="simple-icons:iheartradio" color="red" width={80} /> */}
                    </div>
                    <div className="py-3">
                        <Icontext iconName={"line-md:home-simple-filled"} displaytext="Home" hFlip="flase" />
                        <Icontext iconName={"line-md:search-twotone"} displaytext="Search" hFlip="true" />
                        <Icontext iconName={"fluent:library-28-filled"} displaytext="Library" hFlip="false" />
                        <Icontext iconName={"mdi:folder-music"} displaytext="My Music" hFlip="false" active={true}/>
                    </div>
                    <div className="pt-7">
                        <Icontext iconName={"line-md:plus-square"} displaytext="Create a playlist" hFlip="false" />
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
                <div className="content p-8  overflow-auto">
                    <div className="text-white text-xl font-semibold pb-4 pl-2">My Songs</div>
                  <div className="overflow-auto space-y-3">
                            {SongData.map((item) =>{
                                return <SingleSongcard info={item} playSound={playSound} />;
                            })}
                  </div>

                </div>
            </div>
        </div>
    );
};


export default Mymusic;