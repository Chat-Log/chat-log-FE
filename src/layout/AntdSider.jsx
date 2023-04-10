import React from "react";
import { useState } from "react";

import { FileOutlined, UserOutlined, SearchOutlined, QuestionOutlined, MenuUnfoldOutlined, MenuFoldOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("질문하기", "1", <QuestionOutlined />),
  getItem("내역", "sub1", <FileOutlined />, [getItem("운영체제가뭐야?", "5"), getItem("네트워크가뭐야?", "6"), getItem("안녕?", "7")]),
  getItem("마이페이지", "2", <UserOutlined />),
  getItem("태그별 보기", "3", <TagsOutlined />),
  getItem("검색", "4", <SearchOutlined />),
];

const AntdSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
      style={{
        background: colorBgContainer,
        overflow: "auto",
        height: "100vh",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]} // 처음에 열리는거
        style={{
          height: "100%",
          borderRight: 0,
        }}
        items={items}
      />
      <Button style={{ position: "fixed", bottom: "10px", left: "10px", border: "none", background: "transparent" }} size="large" shape="circle" onClick={() => setCollapsed((prev) => !prev)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  );
};

export default AntdSider;
