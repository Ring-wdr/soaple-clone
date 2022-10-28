import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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
  // const [keyword, setKeyword] = useState('')
  const keyWordRef = useRef();
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
  const searchKeyword = () =>{
    keyWordRef.current.value &&
    axios
      .get(`http://localhost:8080/api/post/search/?keyword=${keyWordRef.current.value.split(' ').join('.')}`)
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
      <div className="flex justify-center items-center w-4/5">
        <input className='shadow-xl mr-5 border-solid border-2' type='text' ref={keyWordRef} onKeyUp={()=>window.event.keyCode==13 && searchKeyword()}/>
        <button className='btn-primary shadow-lg' onClick={searchKeyword}>검색</button>
      </div>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <select className='shadow-inner border-solid border-2 rounded-xl' onChange={categoryChange}>
              <option value={1}>자유</option>
              <option value={2}>자랑</option>
            </select>

            <select className="shadow-inner border-solid border-2 rounded-xl" onChange={sortChange}>
              <option value={"recent"}>최신</option>
              <option value={"popular"}>인기</option>
            </select>
          </div>
          <Button
            title="글 작성하기"
            onClick={() => {
              navigate("/post", {state:{category}});
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
