import React from "react";
import styled from "styled-components";
import { Collapse } from "antd";

const { Panel } = Collapse;

const AntdCollapse = ({ children }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <StCollapse onChange={onChange} expandIconPosition={"end"} bordered={false}>
        <StPanel header="상세 검색 옵션 보기" key="1">
          {children}
        </StPanel>
      </StCollapse>
    </>
  );
};

export default AntdCollapse;

const StCollapse = styled(Collapse)``;

const StPanel = styled(Panel)`
  padding-left: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;
`;
