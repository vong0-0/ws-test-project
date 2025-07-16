import { useContext } from "react";
import { AppContext } from "../context/appProvider";

export default function DragAndDropImage() {
  const { dispatch } = useContext(AppContext);

  function handleUploadImage(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImage = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      dispatch({
        type: "UPLOAD_IMAGE",
        newImage: newImage,
      });
    }
  }

  return (
    <div className="w-full h-full bg-white border-4 border-dotted border-slate-600 rounded-lg">
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white relative z-10 flex items-center text-lg font-bold">
          <p className="text-slate-500">Drag and Drop or &nbsp;</p>
          <label htmlFor="image-file" className="text-blue-500 cursor-pointer">
            browse file
          </label>
        </div>
        <input
          onChange={handleUploadImage}
          id="image-file"
          type="file"
          className="absolute w-full h-full z-0 opacity-0"
          multiple
        />
      </div>
    </div>
  );
}
