import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage";
import AccountRecoveryPage from "../pages/AccountRecoveryPage";
import SearchPage from "../pages/SearchPage";
import AntdLayout from "../layout/AntdLayout";
import SortedByTagPage from "../pages/SortedByTagPage";
import SortedByDatePage from "../pages/SortedByDatePage";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user/help" element={<AccountRecoveryPage />} />
          </Route>
          <Route element={<AntdLayout />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/main/" element={<MainPage />} />
            <Route path="/main/:topicId" element={<MainPage />} />
            <Route path="/tags" element={<SortedByTagPage />} />
            <Route path="/date/:date" element={<SortedByDatePage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
