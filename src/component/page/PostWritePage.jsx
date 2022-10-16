import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
// import ImageUpload from "../ui/ImageUpload";
import { Wrapper, Container } from "../utils/styleUtil";
import axios from "axios";
import ImageTo from "../list/imageTo";

function PostWritePage(props) {
  const navigate = useNavigate();
  // const titleRef = useRef("");
  // const contentRef = useRef("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [imageArr, setImageArr] = useState([]);
  const postInfo = useLocation();
  // const [postKey, setPostKey] = useState(null);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
    // titleRef.current = event.target.value;
  };
  const onContentChange = (event) => {
    setContent(event.target.value);
    // contentRef.current = event.target.value;
  };

  useEffect(() => {
    if (postInfo.state) {
      const {
        state: { category, postId },
      } = postInfo;
      postInfo &&
        axios
          .get(`http://localhost:8000/api/post/${category}/${postId}`)
          .then((res) => {
            const {
              data: [post],
            } = res;
            setTitle(post.title);
            setContent(post.text);
          });
    }
  }, []);

  const onSubmit = async () => {
    if (postInfo.state) {
      const { category, postId } = postInfo.state;
      // console.log(category, postId);
      try {
        await fetch(`http://localhost:8000/api/post/${category}/${postId}/1`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify([
            {
              title,
              content,
            },
          ]),
        });
        navigate(`/post/1/${postId}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const [data] = await (
          await fetch("http://localhost:8000/api/post", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify([
              {
                user: 1,
                category: 1,
                // title: titleRef.current,
                // content: contentRef.current,
                title,
                content,
              },
            ]),
          })
        ).json();
        navigate(`/post/1/${data}`);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Wrapper>
      <Container>
        <div>
          <Button title="글 작성하기" onClick={onSubmit} />
          {/* <TextInput height={20} ref={titleRef} onChange={onTitleChange} /> */}
          <TextInput height={20} value={title} onChange={onTitleChange} />
        </div>
        {/* <TextInput
          height={480}
          ref={contentRef}
          onChange={onContentChange}
        ></TextInput> */}
        <TextInput
          height={480}
          value={content}
          onChange={onContentChange}
        ></TextInput>
        <ImageTo></ImageTo>
      </Container>
    </Wrapper>
  );
}

export default PostWritePage;
