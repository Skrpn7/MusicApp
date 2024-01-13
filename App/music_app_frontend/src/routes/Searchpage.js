import { Icon } from "@iconify/react";
import LoggedinContainer from "../containers/Loggedincontainers";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverhelper";
import SingleSongcard from "../components/shared/SingleSongcard";

const Searchpage = () => {
    const [isInputfocused, setInputfocused] = useState(false);
    const [Searchtext, setSearchtext] = useState("");
    const [SongData, SetSongdata] = useState([]);

    //this will call the search api
    const SearchSong = async () => {
        const response = await makeAuthenticatedGETRequest("/song/get/songname/" + Searchtext);
        SetSongdata(response.data);
        // setSearchtext("");
    }

    return (
        <LoggedinContainer currentactivescreen="search">
            <div className="w-full py-6 ">
                <div className={`w-1/3 p-3 px-5 text-sm rounded-full bg-gray-900 flex text-white space-x-3 items-center ${isInputfocused ? "border border-white" : " "}`}>
                    <div>
                        <Icon icon="zondicons:search" />
                    </div>
                    <input
                        type="text"
                        placeholder="What Do you want to listen?"
                        className="w-full bg-gray-900 focus:outline-none"
                        onFocus={() => {
                            setInputfocused(true);
                        }}
                        onBlur={() => {
                            setInputfocused(false);
                        }}
                        value={Searchtext}

                        onChange={(e) => { setSearchtext(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                SearchSong();
                            }
                        }}
                    />
                </div>
                {
                    SongData.length > 0 ?(
                <div className="pt-10 space-y-3 ">
                    <div className="text-white">
                        showing search result for "<span className="font-bold"> {Searchtext}</span>"
                    </div>
                    {SongData.map(item => {
                        return (<SingleSongcard info={item} key={JSON.stringify(item)} playSound={() => { }} />);
                    })}
                </div>)
                :(
                    <div className="text-white pt-10">
                        Nothing to show here!
                    </div>
                )
                
                }
            </div>
        </LoggedinContainer>
    );
}

export default Searchpage;