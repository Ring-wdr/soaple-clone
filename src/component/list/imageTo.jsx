import axios from "axios";
import React from "react";
import { useState, useRef } from "react";

const ImageTo = ({setImgs}) => {
  // const [imageUrl, setImageUrl] = useState(null);
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
    <form>
      <input
        type="file"
        ref={imgRef}
        accept="image/*"
        onChange={onSubmitImage}
      ></input>
    </form>
  );
};

export default ImageTo;
