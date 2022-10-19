import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";
import MainPage from "./component/page/MainPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import Header from "./component/list/Header";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UserContext } from "./context/UserContext";

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

// axios.defaults = "http://localhost:8000";
// axios.options.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Header />
      <MainTitleText>김밥을 마는 중</MainTitleText>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="post/:category/:postId" element={<PostViewPage />} />
        <Route path="post" element={<PostWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
