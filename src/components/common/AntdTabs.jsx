import { Tabs } from "antd";
import styled from "styled-components";

const onChange = (key) => {};

const AntdTabs = ({ width, items }) => {
  return (
    <>
      <StTab defaultActiveKey="1" items={items} onChange={onChange} width={width} />
    </>
  );
};
export default AntdTabs;

const StTab = styled(Tabs)`
  width: ${({ width }) => width};
`;
