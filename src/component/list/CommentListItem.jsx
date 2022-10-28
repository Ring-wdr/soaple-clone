import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import { usePost } from "../utils/usePost";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.pid ? "lightgray" : "white")};
  :hover {
    background: ${(props) => (props.pid ? "gray" : "lightgray")};
  }
`;

const ContentText = styled.p`
  font-size: 14px;
`;

function CommentListItem({ comment, toggleReply }) {
  const [hidden, setHidden] = useState(true);
  const {category, postId} = usePost();
  const modifyRef = useRef();

  const modifyToggle = (content)=>{
    setHidden(!hidden)
    modifyRef.current.value = content;
  }

  const clickModify = async(cid) =>{
    await fetch(`http://localhost:8080/api/post/reply/${category}/${postId}/2/${cid}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(
        {
          content: modifyRef.current.value,
        },
      ),
    })
    window.location.reload();
  }
  

  const clickDelete = (event) => {
    fetch(`http://localhost:8080/api/post/reply/${category}/${postId}/2/${comment.id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <>
      <Wrapper key={comment.id} pid={comment.pid} >
        <ContentText>{comment.nickname}</ContentText>
        <ContentText>{comment.content}</ContentText>
        {comment.pid ? null :
          <button onClick={()=>toggleReply(comment.id)}>
            대댓글 달기
          </button>}
        <button onClick={()=>modifyToggle(comment.content)}>수정</button>
        <button onClick={clickDelete}>삭제</button>
      </Wrapper>
      {
        <div hidden={hidden}>
          <TextInput height={40} ref={modifyRef} />
          <Button title="댓글 수정하기" onClick={()=>clickModify(comment.id)} />
        </div>
      }
    </>
  );
}

export default CommentListItem;
