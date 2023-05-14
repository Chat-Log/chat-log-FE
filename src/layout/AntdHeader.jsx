import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AntdUser from "../components/common/AntdUser";
import { PATH } from "../constants/index";
const { Header } = Layout;

export const AntdHeader = () => {
  return (
    <>
      <StHeader>
        <Link to={PATH.main}>
          <StTitle>CHAT GPT</StTitle>
        </Link>
        <StBox>
          <Button
            type="primary"
            size="middle"
            icon={
              <Link to={PATH.search}>
                <SearchOutlined />
              </Link>
            }
            // 헤더에 검색 부분 페이지 링크 연결
            style={{ background: "transparent", boxShadow: "none" }}
          />
          <Link to={PATH.mypage}>
            <AntdUser />
          </Link>
          <div>Lee Shin</div>
        </StBox>
      </StHeader>
    </>
  );
};

export default AntdHeader;

const StHeader = styled(Header)`
  height: 70px;
  background-color: #cecff4;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  /* margin-bottom: 10px; */
`;

const StTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
