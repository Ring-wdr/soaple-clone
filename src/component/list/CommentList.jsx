import React, { useRef, useState } from "react";
// import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { usePost } from "../utils/usePost";
import CommentListItem from "./CommentListItem";
import ReplyList from "./ReplyList";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   & > * {
//     :not(:last-child) {
//       margin-bottom: 16px;
//     }
//   }
// `;

function CommentList({comments}) {
  const [isReply, setReply] = useState({})
  const {category, postId} = usePost();
  const replyRef = useRef();


  const toggleReply = (pid) => {
    setReply(comments.reduce((s, {id})=>({...s, [id]: id === pid ? true : false}),{}))
  }
  
  const commentSubmit = async (event) => {
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
                pid: Object.entries(isReply).filter(value=>value[1])[0][0],
                content: replyRef.current.value,
              },
            ]),
          }
        );
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
      
  };

  return (
    <>
      {comments.map((comment, idx) => (
        <div key={idx}>
          <CommentListItem key={comment.id} comment={comment} toggleReply={toggleReply}/>
          {isReply[comment.id] ? <>
            <TextInput height={40} ref={replyRef} />
            <Button title="댓글 작성하기" onClick={commentSubmit} />
          </> : null}
          <ReplyList comment={comment} />
        </div>
      ))}
    </>
  );
}

export default CommentList;
