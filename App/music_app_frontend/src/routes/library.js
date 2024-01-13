import { useEffect, useState } from "react";
import LoggedinContainer from "../containers/Loggedincontainers";
import { makeAuthenticatedGETRequest } from "../utils/serverhelper";

const Library = () => {


    const [myplaylists, setmyplaylists] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            setmyplaylists(response.data);
        };
        getData();
    }, [])

    return (

        <LoggedinContainer currentactivescreen="library" >
            <div className="text-white font-semibold  text-xl pt-8">
                My Playlists
            </div>
            <div className="py-5 grid gap-4 grid-cols-5">

                {
                    myplaylists.map(item => {
                        return <Card key={JSON.stringify(item)} title={item.name} description="" imgurl={item.Thumbnail} />
                    })
                }

            </div>
        </LoggedinContainer>
    )
}

const Card = ({ title, description, imgurl }) => {
    return (
        <div className="bg-black bg-opacity-50 w-full p-4 rounded-lg cursor-pointer">
            <div className="py-4">
                <img className="w-full rounded-md" alt="card" src={imgurl} />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>

        </div>
    );
};


export default Library;