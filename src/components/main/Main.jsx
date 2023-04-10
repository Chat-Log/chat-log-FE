import React from "react";
import styled from "styled-components";

import { ICON } from "../../constants";

import { Button, Layout, theme } from "antd";

import AntdSelect from "../common/AntdSelect";
import AntdInput from "../common/AntdInput";
import AntdTag from "../common/AntdTag";
import AntdSearch from "../common/AntdSearch";
import AntdSubHeader from "../common/AntdSubHeader";
import AntdContent from "../common/AntdContent";

const { Content } = Layout;

const Main = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <AntdSubHeader jc="space-between">
        <StP>질문하기</StP>
        <Button>key 등록</Button>
      </AntdSubHeader>

      <AntdContent>
        <StTitleBox>
          <AntdInput ph="제목을 입력하세요" width="90%" />
          <AntdSelect />
        </StTitleBox>
        <StChatBox>
          <div style={{ width: "100%", height: "100px", border: "1px solid rgba(0, 0, 0, 0.15)", marginBottom: "10px" }}>채팅 카드 넣자</div>
          <div style={{ width: "100%", height: "100px", border: "1px solid rgba(0, 0, 0, 0.15)", marginBottom: "10px" }}>채팅 카드 넣자</div>
          <div style={{ width: "100%", height: "100px", border: "1px solid rgba(0, 0, 0, 0.15)", marginBottom: "10px" }}>채팅 카드 넣자</div>
          <div style={{ width: "100%", height: "100px", border: "1px solid rgba(0, 0, 0, 0.15)", marginBottom: "10px" }}>채팅 카드 넣자</div>
          <div style={{ width: "100%", height: "100px", border: "1px solid rgba(0, 0, 0, 0.15)", marginBottom: "10px" }}>채팅 카드 넣자</div>
          <div style={{ width: "100%", height: "100px", border: "1px solid rgba(0, 0, 0, 0.15)", marginBottom: "10px" }}>채팅 카드 넣자</div>
        </StChatBox>
        <StQBox>
          <AntdTag />
          <AntdSearch ph="내용을 입력하세요" eb={ICON.send} />
        </StQBox>
      </AntdContent>
    </>
  );
};
export default Main;

const StP = styled.p`
  font-size: 2rem;
`;

const StTitleBox = styled.div`
  height: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
const StChatBox = styled.div`
  height: 700px;

  padding: 20px;
  overflow: auto;

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
const StQBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100px;
  margin: 10px;
  padding: 10px;
`;
