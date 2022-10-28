import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./component/page/MainPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import Header from "./component/list/Header";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostProvider } from "./component/utils/usePost";
import MarketPage from "./component/page/MarkePage";

// axios.defaults = "http://localhost:8000";
// axios.options.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Header />
      <div className="text-center text-[6rem]">김밥을 마는 중</div>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="post/:category/:postId"
          element={
          <PostProvider>
            <PostViewPage />
          </PostProvider>        
          } />
        <Route path="post" element={<PostWritePage />} />
        <Route path="market" element={<MarketPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
