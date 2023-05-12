import React from "react";
import styled from "styled-components";
import { Layout, theme } from "antd";

const { Header } = Layout;

const AntdSubHeader = ({ children, jc, height, margin }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <StHeader jc={jc} bg={colorBgContainer} height={height} margin={margin}>
      {children}
    </StHeader>
  );
};

export default AntdSubHeader;

const StHeader = styled(Header)`
  display: flex;
  /* justify-content: space-between; */
  justify-content: ${({ jc }) => jc};
  align-items: center;
  background: ${({ bg }) => bg};
  height: ${({ height }) => height};
  padding: 0 15px 0 15px;
  margin: ${({ margin }) => margin};
  /* margin: 10px 10px 15px 10px; */
`;
