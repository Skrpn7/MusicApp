import { useState } from "react";
import TextInput from "../components/shared/TesxtInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverhelper"

const Createplaylistmodal = ({ closemodal }) => {

    const [Playlistname, setPlaylistname] = useState("");
    const [Playlistthumbnail, setPlaylistnamethumbnail] = useState("");
    
 

    const Createplaylist = async () => {

        const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
            name: Playlistname,
            Thumbnail: Playlistthumbnail,
            songs: []
        }

        );
        if(response._id){
            closemodal();
        }
    };

    return (
        <div className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center" onClick={closemodal}>
            <div className="bg-app-black w-1/3 rounded-md p-5 shadow-2xl" onClick={(e) => { e.stopPropagation(); }}>
                <div className="text-white mb-5 font-semibold text-lg">Create Playlist</div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Name"
                        labelclassname={"text-white"}
                        placeholder="Playlist Name"
                        value={Playlistname}
                        setValue={setPlaylistname}
                    />
                    <TextInput
                        label="Thumbnail"
                        labelclassname={"text-white"}
                        placeholder="Thumbnail"
                        value={Playlistthumbnail}
                        setValue={setPlaylistnamethumbnail}
                    />
                    <div className="bg-white w-1/3 py-3 rounded flex font-semibold justify-center items-center mt-4 cursor-pointer " onClick={Createplaylist}>Create</div>
                </div>
            </div>
        </div>
    );
}

export default Createplaylistmodal;