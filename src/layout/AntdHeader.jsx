import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;

export const AntdHeader = () => {
  return (
    <>
      <StHeader />
    </>
  );
};

export default AntdHeader;

const StHeader = styled(Header)`
  height: 50px;
  margin-bottom: 10px;
`;
