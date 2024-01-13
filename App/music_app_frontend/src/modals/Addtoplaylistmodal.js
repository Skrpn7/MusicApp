import { useEffect,useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverhelper";


const Addtoplaylistmodal = ({closemodal, addSongtoplaylist})=>{

    const [myplaylists, setmyplaylists] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            setmyplaylists(response.data);
        };
        getData();
    }, [])

    return(
        <div className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center" onClick={closemodal}>
            <div className="bg-app-black w-1/3 rounded-md p-5 shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
                <div className="text-white mb-5 font-semibold text-lg">Select Playlist</div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                {myplaylists.map(item =>{
                    return <Playlistcomponent info={item} addSongtoplaylist={addSongtoplaylist} />
                })}
                </div>
            </div>
        </div>
    )
}

const Playlistcomponent = ({info,addSongtoplaylist}) =>{

    return(
        <div className="bg-app-black flex w-full items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3" onClick={()=>{
            addSongtoplaylist(info._id)
        }}>
            <div>
                <img src={info.Thumbnail} className="w-10 h-10 rounded" alt="Thumbnail" />
            </div>

            <div className="text-white font-semibold text-sm">
                {info.name}
            </div>

        </div>
    )
}

export default Addtoplaylistmodal;