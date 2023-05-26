import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage";
import AccountRecoveryPage from "../pages/AccountRecoveryPage";
import SearchPage from "../pages/SearchPage";
import AntdLayout from "../layout/AntdLayout";
import SortedByTagPage from "../pages/SortedByTagPage";
import SortedByDatePage from "../pages/SortedByDatePage";
import MyPage from "../pages/MyPage";
import AuthCheck from "./AuthCheck";
import NotFoundPage from "../components/error/NotPound";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user/help" element={<AccountRecoveryPage />} />
          </Route>
          <Route path="/" element={<AntdLayout />}>
            <Route path="search" element={<AuthCheck />}>
              <Route index element={<SearchPage />} />
            </Route>
            <Route path="main/" element={<AuthCheck />}>
              <Route index element={<MainPage />} />
            </Route>
            <Route path="main/:topicId" element={<AuthCheck />}>
              <Route index element={<MainPage />} />
            </Route>
            <Route path="tags" element={<AuthCheck />}>
              <Route index element={<SortedByTagPage />} />
            </Route>
            <Route path="date/:date" element={<AuthCheck />}>
              <Route index element={<SortedByDatePage />} />
            </Route>
            <Route path="mypage" element={<AuthCheck />}>
              <Route index element={<MyPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
