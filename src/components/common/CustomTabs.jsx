import { Tabs } from "antd";
import styled from "styled-components";

export const CustomTabs = ({ width, items, onChange, color }) => {
  return (
    <>
      <StTab defaultActiveKey="1" items={items} onChange={onChange} width={width} color={color} />
    </>
  );
};

const StTab = styled(Tabs)`
  width: ${({ width }) => width};
  font-family: "MaplestoryOTFLight";

  .ant-tabs-tab {
    color: ${({ color }) => color};
  }

  // 선택된 탭 색상
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ color }) => color};
  }

  .ant-tabs-tab:hover {
    color: ${({ color }) => color};
  }

  .ant-tabs-ink-bar {
    background-color: ${({ color }) => color};
  }
`;
