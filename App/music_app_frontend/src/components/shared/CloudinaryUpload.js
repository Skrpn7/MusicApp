import { cloudinary_upload_preset } from "../../config";
import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinaryUpload = ({seturl, setname}) => {
  const uploadImageWidget = () => {
    
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "ddmqeu1ab",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
         seturl(result.info.secure_url); 
         setname(result.info.original_filename);
        }else {
           if(error){
               
               console.log("error");
           }
        }
        
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white rounded-full p-4 font-semibold" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
