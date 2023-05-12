import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AntdSubHeader from "../components/common/AntdSubHeader";
import AntdHeader from "./AntdHeader";
import AntdSider from "./AntdSider";

const AntdLayout = () => {
  return (
    <Layout>
      <AntdHeader />
      <Layout>
        <AntdSider />
        <StContainer>
          <Outlet />
        </StContainer>
      </Layout>
    </Layout>
  );
};

export default AntdLayout;

const StContainer = styled(Layout)`
  /* padding: 24px 0 0 0; */
`;
