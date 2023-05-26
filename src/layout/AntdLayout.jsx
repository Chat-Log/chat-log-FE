import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AntdHeader from "./AntdHeader";
import AntdSider from "./AntdSider";

const AntdLayout = () => {
  return (
    <StFullHeightLayout>
      <AntdHeader />
      <StContentLayout>
        {/* <StContainer> */}
        <AntdSider />
        <Outlet />
        {/* </StContainer> */}
      </StContentLayout>
      <FloatButton.BackTop />
    </StFullHeightLayout>
  );
};

export default AntdLayout;

const StContainer = styled(Layout)``;

const StFullHeightLayout = styled(Layout)``;

const StContentLayout = styled(Layout)`
  padding-top: 70px;
  /* height: 100%; */
  /* height: 50vh; */
  /* overflow: hidden; */
  /* height: 100%; */

  /* overflow: hidden; */
`;
