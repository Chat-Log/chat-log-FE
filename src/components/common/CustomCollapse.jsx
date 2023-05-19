import React from "react";
import styled from "styled-components";
import { Collapse, theme } from "antd";

const { Panel } = Collapse;

export const CustomCollapse = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <StCollapse expandIconPosition={"end"} bordered={false} bg={colorBgContainer}>
        <StPanel header="상세 검색 옵션 보기" key="1">
          {children}
        </StPanel>
      </StCollapse>
    </>
  );
};

const StCollapse = styled(Collapse)`
  background: ${({ bg }) => bg};
`;

const StPanel = styled(Panel)`
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;
`;
