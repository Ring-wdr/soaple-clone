import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PostList from "../list/PostList";
import Button from "../ui/Button";
// import data from "../../data.json";
// import axios from "axios";
import { Wrapper, Container } from "../utils/styleUtil";

function MainPage(props) {
  const [datas, setData] = useState([]);
  const [category, setCategory] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate();
  // console.log(process.env.REACT_APP_HOST)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/post/${category}?sortBy=${sortBy}`)
      .then((res) => {
        const { data } = res;
        setData(data);
        // console.log(data);
      });
  }, [category, sortBy]);

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };
  const sortChange = (event) => {
    setSortBy(event.target.value);
  };
  const keywordChage = (event) => {
    setKeyword(event.target.value)
  }

  const searchKeyword = () =>{
    axios
      .get(`http://localhost:8080/api/post/search/?keyword=${keyword.split(' ').join('.')}`)
      .then((res) => {
        const { data } = res;
        if (data.length < 1){
          // alert('검색 결과가 없어용')
          toast.error('검색 결과가 없어용', {
            position: toast.POSITION.TOP_CENTER
          })
          return
        }
        setData(data);
      });
  }
  return (
    <Wrapper>
    <div>
      <input type='text' value={keyword} onChange={keywordChage}/>
      <button className='btn-primary' onClick={searchKeyword}>검색</button>
    </div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <select onChange={categoryChange}>
            <option value={1}>자유</option>
            <option value={2}>자랑</option>
          </select>

          <select onChange={sortChange}>
            <option value={"recent"}>최신</option>
            <option value={"popular"}>인기</option>
          </select>
          <Button
            title="글 작성하기"
            onClick={() => {
              navigate("/post");
            }}
          />
        </div>
        <PostList
          posts={datas}
          category={category}
          onClickItem={(post) => {
            navigate(`/post/${category}/${post.id}`);
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default MainPage;
