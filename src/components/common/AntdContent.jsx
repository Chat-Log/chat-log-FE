import React from "react";
import styled from "styled-components";
import { Content } from "antd/es/layout/layout";
import { theme } from "antd";

const AntdContent = ({ children, of }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <StContent bg={colorBgContainer} of={of}>
        {children}
      </StContent>
    </>
  );
};

export default AntdContent;

const StContent = styled(Content)`
  /* padding: 10px; */

  background: ${({ bg }) => bg};
  max-height: 860px;
  overflow: ${({ of }) => of};
`;
