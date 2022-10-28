import axios from "axios";
import React from "react";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
const ImageTo = ({setImgs}) => {
  const imgRef = useRef();

  const onSubmitImage = async (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      // console.log(uploadFile)
      const formData = new FormData();
      formData.append("img", uploadFile);

      const {
        data: fileId,
      } = await axios({
        method: "post",
        url: "http://localhost:8080/api/file",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
        },
      });
      console.log(fileId);
      // updateImg(fileId);
      setImgs(prev => [...prev, {file: fileId, isDel: false, isRecent: true}])
    }
  };

  return (
    <div className="attachedFileBtn py-3 border-t">
      <label htmlFor="file">
        <div className="uploadBtn flex items-center justify-center cursor-pointer">
          <i className="ri-camera-fill text-3xl"></i>
        </div>
      </label>
      <input
        type="file"
        id="file"
        ref={imgRef}
        accept="image/*"
        onChange={onSubmitImage}
        hidden
      ></input>
    </div>
  );
    // <form>
    //   <input
    //     type="file"
    //     ref={imgRef}
    //     accept="image/*"
    //     onChange={onSubmitImage}
    //   ></input>
    // </form>
};

export default ImageTo;
