import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
// import ImageUpload from "../ui/ImageUpload";
import { Wrapper, Container } from "../utils/styleUtil";
import axios from "axios";
import ImageTo from "../list/imageTo";
// import useImage from "../utils/useImage";
import { toast } from "react-toastify";
import ImageList from "../list/ImageList";

function PostWritePage(props) {
  const navigate = useNavigate();
  const [cate, setCate] = useState(1);
  const [imgs, setImgs] = useState([])
  const titleRef = useRef("");
  const contentRef = useRef("");
  // const { imgKeys, clearImg } = useImage();
  const postInfo = useLocation();


  const categoryChange = (event) => {
    setCate(event.target.value);
  };

  const onSubmit = async () => {
    if (!titleRef.current.value){
      return toast.error('제목을 입력해주세요')
    }
    if (!contentRef.current.value){  
      return toast.error('내용을 입력해주세요')
    }
    if (parseInt(cate) === 2 && imgs.length < 1){
      return toast.error('자랑게시판에는 최소 1개의 사진이 필요해요')
    }
    // console.log(imgs.filter(img=>img.isDel).map(img=>img.file))
    // console.log(imgs.filter(img=>img.isRecent).map(img=>img.file))
    
    try {
      let pid;
      if (postInfo.state.postId) {
        const { category, postId } = postInfo.state;
        await fetch(`http://localhost:8080/api/post/${category}/${postId}/1`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify([
            {
              title: titleRef.current.value,
              content: contentRef.current.value,
            },
          ]),
        })
      imgs.length > 0 && imgs.filter(img=>img.isDel).length > 0 && 
        await fetch(`http://localhost:8080/api/post/img/${cate}/${postId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            filesKeys: imgs.filter(img=>img.isDel).map(img=>img.file),
          }),
        });

        pid = postId
      } else {
        const [data] = await (
           await fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify([
              {
                user: 1,
                category: cate,
                title: titleRef.current.value,
                content: contentRef.current.value,
              },
            ]),
          })
        ).json();
        pid = data
      }
      
      imgs.length > 0 && imgs.filter(img=>img.isRecent).length > 0 && 
        await fetch(`http://localhost:8080/api/post/img/${cate}/${pid}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            filesKeys: imgs.filter(img=>img.isRecent).map(img=>img.file),
            // filesKeys: imgs.reduce((result, img) => {
            //   if (img.isRecent) return [...result, img.file]
            // }, []),
          }),
        });

      navigate(`/post/${cate}/${pid}`);
      postInfo.state ? toast.success('글이 수정되었습니다')
        : toast.success('글이 작성되었습니다.');
    } catch (err) {
      toast.error('글 작성중 오류가 발생했습니다')
      console.error(err);
    } 
  };

  const imgDelete = (evt) =>{
    // setImgs(imgs.filter(img => img.file !== parseInt(evt.target.value)))
    setImgs(imgs.map(img => img.file !== parseInt(evt.target.value) ? img : {...img, isDel: true}))
    // console.log(imgs)
  }
  
  useEffect(() => {
    // console.log(postInfo.state)
    if (postInfo.state.postId) {
      const {
        state: { category, postId },
      } = postInfo;
      Promise.all([axios.get(`http://localhost:8080/api/post/${category}/${postId}`),
                   axios.get(`http://localhost:8080/api/post/img/${category}/${postId}`)])
          .then((res) => {
            const [
            {
              data: [post],
            },
            { data: imges },
            ] = res;
            titleRef.current.value = post.title;
            contentRef.current.value = post.text;
            // console.log(imges.map(img=>({...img, isDel: false, isRecent: false})))
            setImgs(imges.map(img=>({...img, isDel: false, isRecent: false})))
          });
    }
    setCate(postInfo.state.category)
  }, []);

  return (
    <Wrapper>
      <Container>
        <select value={cate} onChange={categoryChange}>
          <option value={1} >자유</option>
          <option value={2}>자랑</option>
        </select>
        <div>
          <Button title="글 작성하기" onClick={onSubmit} />
          <TextInput height={60} ref={titleRef}/>
        </div>
        {imgs.length > 0 ?
          <ImageList imgs={imgs} isWrite={true} imgDelete={imgDelete}/> 
        : null}
        <TextInput height={480} ref={contentRef}/>
        <ImageTo imgs={imgs} setImgs={setImgs}></ImageTo>
      </Container>
    </Wrapper>
  );
}

export default PostWritePage;
