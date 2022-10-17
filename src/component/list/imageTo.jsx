import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import useImage from "../utils/useImage";

const ImageTo = (props) => {
  // const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();
  const { updateImg } = useImage();

  const onSubmitImage = async (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("img", uploadFile);

      const {
        data: [fileId],
      } = await axios({
        method: "post",
        url: "/api/file",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
        },
      });
      // console.log(fileId);
      updateImg(fileId);
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
