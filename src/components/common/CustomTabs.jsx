import { Tabs } from "antd";
import styled from "styled-components";

export const CustomTabs = ({ width, items, onChange }) => {
  return (
    <>
      <StTab defaultActiveKey="1" items={items} onChange={onChange} width={width} />
    </>
  );
};

const StTab = styled(Tabs)`
  width: ${({ width }) => width};
  font-family: "MaplestoryOTFLight";
`;
