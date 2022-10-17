import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../list/PostList";
import Button from "../ui/Button";
// import data from "../../data.json";
// import axios from "axios";
import { Wrapper, Container } from "../utils/styleUtil";

function MainPage(props) {
  const {} = props;
  const [datas, setData] = useState([]);
  const [category, setCategory] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/post/${category}?sortBy=${sortBy}`)
      .then((res) => {
        const { data } = res;
        setData(data);
        console.log(data.slice(0, 5));
      });
  }, [category, sortBy]);

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };
  const sortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Wrapper>
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
            <option value={"boast"}>인기</option>
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
