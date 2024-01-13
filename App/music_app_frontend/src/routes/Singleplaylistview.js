import { useParams } from "react-router-dom"
import LoggedinContainer from "../containers/Loggedincontainers";
import { useState } from "react";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverhelper";
import SingleSongcard from "../components/shared/SingleSongcard";


const Singleplaylistview = () => {

    const [Playlistdetail, setPlaylistdetail] = useState({});

    const { playlistId } = useParams();
    console.log(playlistId)

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/" + playlistId);
            setPlaylistdetail(response);
        }
        getData();
    }, [])

    return (
        <LoggedinContainer currentactivescreen="library">
            {Playlistdetail._id &&
                <div>
                    <div className="text-white font-semibold  text-xl pt-8">
                        {Playlistdetail.name}
                    </div>
                    <div className="pt-10 space-y-3 ">
                    {Playlistdetail.songs.map(item => {
                        return (<SingleSongcard info={item} key={JSON.stringify(item)} playSound={() => { }}/>);
                    })}
                </div>
                </div>
            }
        </LoggedinContainer>
    )
}


export default Singleplaylistview