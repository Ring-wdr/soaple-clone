import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import { Wrapper, Container } from "../utils/styleUtil";
import { ProfileDummy, ProfileInline } from "./ProfileComp";
import LikeButton from "../ui/LikeButton";
import dayjs from "dayjs";
import ImageList from "../list/ImageList";
import { usePost } from "../utils/usePost";
const PostContainter = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
  word-break: break-all;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

function PostViewPage(props) {
  const navigate = useNavigate();
  const { category, postId } = useParams();
  const [updateDel, setUpdateDel] = useState(false);
  const { setCategory, setPostId } = usePost();
  // console.log(import.meta.env)
  // const post = data.find((item) => item.id == postId);
  const [datum, setDatum] = useState({
    title: "",
    content: "",
    createAt: "",
    imgs: [],
    replyCnt: 0,
  });
  const [comm, setComm] = useState([]);
  // const commentRef ();
  const [comment, setComment] = useState('')

  const commentChange = (event) => {
    // commentRef.current = event.target.value;
    setComment(event.target.value)
  };

  const onUpdateDel = () => {
    setUpdateDel(!updateDel);
  };

  const commentSubmit = async (event) => {
    if (comment)
      try {
        // await (
        await fetch(
          `http://localhost:8080/api/post/reply/${category}/${postId}/2`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify([
              {
                pid: null,
                content: comment,
              },
            ]),
          }
        );
        // navigate(`/post/1/${postId}`);
        // commentRef.current = "";
        setComment('')
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {  
    setCategory(category)
    setPostId(postId)
    const controller = new AbortController();
    const { signal } = controller;
    Promise.all([
      axios.get(`http://localhost:8080/api/post/${category}/${postId}`,{signal}),
      axios.get(`http://localhost:8080/api/post/img/${category}/${postId}`,{signal}),
      axios.get(`http://localhost:8080/api/post/reply/${category}/${postId}`,{signal}),
    ])
      .then((res) => {
        const [
          {
            data: [post],
          },
          { data: imgs },
          { data: reply },
        ] = res;
        // console.log(post);
        // setComm(reply);
        // console.log(imgs);
        const [oneDepth, twoDepth] = reply;
        setComm(
          oneDepth.map((preply) => {
            preply.reply = twoDepth.filter((rep) => rep.pid == preply.id);
            return preply;
          })
        );

        setDatum({
          ...post,
          content: post.text,
          user: post.userId,
          imgs: imgs,
          replyCnt: oneDepth.length + twoDepth.length,
        });
      })
      .catch((err) => console.error(err));

    return () => controller.abort();
  }, []);

  const modifyAction = () =>
    datum.user === 1
      ? navigate("/post", { state: { category, postId } })
      : alert("???????????? ????????? ??? ????????????");

  const deleteAction = () =>
    datum.user === 1
      ? window.confirm("?????? ?????????????????????????")
        ? axios
            .delete(`http://localhost:8080/api/post/${category}/${postId}/1`)
            .then((res) => {
              alert(`???????????? ?????????????????????.`);
              navigate("/");
            })
            .catch((err) => console.log(err))
        : alert("????????? ?????????????????????")
      : alert("????????? ????????? ????????? ??? ????????????");

  return (
    <Wrapper>
      <Container>
        <div className="flex justify-between">
          <div>
            <Button
              title="?????? ??????"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          {updateDel ? (
            <div className="space-x-3">
              <button onClick={modifyAction}>??????</button>
              <button onClick={deleteAction}>??????</button>
              <button onClick={onUpdateDel}>????????????</button>
            </div>
          ) : (
            <div>
              <button onClick={onUpdateDel}>...</button>
            </div>
          )}
        </div>
        <PostContainter className="bg-gradient-to-r from-gray-300 to-blue-100">
          <TitleText className="mb-5">{datum.title}</TitleText>

          <ProfileInline>
            <ProfileDummy></ProfileDummy>
            <p>{datum.nickname} || </p>
            <p>??????: {datum.replyCnt} || </p>
            <p>?????????: {datum.likesCnt}</p>
          </ProfileInline>
          <p>          
            <span>????????? {dayjs(datum.createAt).format('YYYY-MM-DD')}</span>
          </p>
          {datum.imgs ? <ImageList imgs={datum.imgs}/> : null}


          <ContentText>{datum.content}</ContentText>
          <LikeButton/>
        </PostContainter>

        <CommentLabel>??????</CommentLabel>
        <CommentList comments={comm || []} category={category} postId={postId}/>

        <TextInput height={40} value={comment} onChange={commentChange} />
        <Button title="?????? ????????????" onClick={commentSubmit} />
      </Container>
    </Wrapper>
  );
}
export default PostViewPage;
