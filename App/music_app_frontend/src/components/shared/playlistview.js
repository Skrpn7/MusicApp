



const Playview = ({ titletext, cardsData }) => {
    return (<div className="text-white mt-8">
        <div className="text-2xl font-semibold mb-6">
            {titletext}
        </div>
        <div className="w-full flex justify-between space-x-4">
            {
                cardsData.map(item => {
                    return <Card title={item.title} description={item.description} imgurl={item.imgurl} />
                })
            }

            {/* <Card title="Taylor Swift" description="Best Of Taylor Swift" imgurl="https://people.com/thmb/bnv58OSnUSsOsnwP_c9f85fBdv0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(992x0:994x2)/taylor-swift7-2000-48f9bfb372c34e36866773b1ede0b372.jpg" />
            <Card title="Selena Gomez" description="Best Of Selena Gomez" imgurl={"https://upload.wikimedia.org/wikipedia/en/a/ae/Selena_Gomez_-_For_You_%28Official_Album_Cover%29.png"} />
            <Card title="Ariana Grande" description="Best Of Ariana Grande" imgurl={"https://www.udiscovermusic.com/wp-content/uploads/2019/05/Ariana-Grande-Dangerous-Woman-album-cover-web-optimised-820-820x820.jpg"} />
            <Card title="Lana Del Rey" description="Best Of Lana Del Rey" imgurl={"https://upload.wikimedia.org/wikipedia/en/2/29/BornToDieAlbumCover.png"} />
            <Card title="Pitbull" description="Best Of Pitbull" imgurl={"https://studiodiscography.files.wordpress.com/2019/10/2004-8-m.i.a.m.i..jpg"} /> */}
        </div>
    </div>
    );
};

const Card = ({ title, description, imgurl }) => {
    return (
        <div className="bg-black bg-opacity-50 w-1/5 p-4 rounded-lg">
            <div className="py-4">
                <img className="w-full rounded-md" alt="card" src={imgurl} />
            </div>
            <div className="text-white  py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>

        </div>
    );
};


export default Playview;