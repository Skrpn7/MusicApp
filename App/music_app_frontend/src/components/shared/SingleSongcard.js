import { useContext } from "react";
import SongContext from "../../contexts/songcontext";

const SingleSongcard = ({info,playSound}) => {

    const {currentSong,setCurrentSong} = useContext(SongContext);

    return <div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-md" onClick={()=> {setCurrentSong(info)}}>
        <div className="w-12 h-12 bg-cover bg-center "
            style={{ backgroundImage: `url("${info.Thumbnail}")` }}
        >

        </div>
        <div className="flex w-full">

            <div className="text-white flex justify-center flex-col pl-4 w-5/6 ">
                <div className="cursor-pointer hover:underline">{info.name}</div>
                <div className="text-gray-400 text-xs hover:underline cursor-pointer">{info.artist.firstname + " " + info.artist.lastname}
                </div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm ">
                3:44
            </div>
        </div>
    </div>

}


export default SingleSongcard;