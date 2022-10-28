import React from "react";
import styled from "styled-components";
import { ProfileDummy, ProfileInline } from "../page/ProfileComp";
import dayjs from "dayjs";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

function PostListItem(props) {
  const { post, onClick } = props;
  return (
    <Wrapper onClick={onClick}>
      <div>
        <TitleText className="mb-5">{post.title}</TitleText>
        <ProfileInline>
          <ProfileDummy></ProfileDummy>
          <span>{post.nickname}</span>
        </ProfileInline>
        <div>
          <p>{dayjs(post.createAt).format('YYYY-MM-DD HH시 mm분')}</p>
        </div>
      </div>
      <div>
        <img
          style={{
            height: "100px",
            width: "100px",
            objectFit: "cover",
          }}
          className='truncate ...'
          src={`${post.filePath}`}
          alt={post.title}
        ></img>
      </div>
    </Wrapper>
  );
}

export default PostListItem;
