import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { CustomButton, CustomUser } from "../components/common";

import { PATH, IMAGES } from "../constants";

import { Modal, Form, InputNumber, Input, Button, Layout } from "antd";
import { SearchOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
const { Header } = Layout;

export const AntdHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nickname, setNickname] = useState("");
  const [historyLimit, setHistoryLimit] = useState(10);

  const name = localStorage.getItem("name");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    // 로컬 스토리지에서 토큰과 사용자 정보를 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
  };

  return (
    <>
      <StHeader>
        <Link to={PATH.home}>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <StImg src={IMAGES.chatlog2} />
            {/* <StTitle>CHAT GPT</StTitle> */}
          </div>
        </Link>
        <StBox>
          {/* <Button type="primary" size="middle" icon={<SettingOutlined />} onClick={showModal} style={{ background: "transparent", boxShadow: "none" }} /> */}
          <Modal title="설정" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="확인" cancelText="닫기">
            <Form>
              <Form.Item label="닉네임" style={{ marginTop: "30px" }}>
                <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </Form.Item>
              <Form.Item label="최근내역 개수">
                <InputNumber min={1} value={historyLimit} onChange={(value) => setHistoryLimit(value)} />
              </Form.Item>
            </Form>
          </Modal>
          <Button
            type="primary"
            size="middle"
            icon={
              <Link to={PATH.search}>
                <SearchOutlined />
              </Link>
            }
            style={{ background: "transparent", boxShadow: "none", color: "black" }}
          />

          <Link to={PATH.mypage}>
            <CustomUser />
          </Link>
          <div>{name}</div>
          <Link to={PATH.login}>
            <Button type="primary" size="middle" icon={<LogoutOutlined />} onClick={logout} style={{ background: "transparent", boxShadow: "none", color: "black" }} />
          </Link>
        </StBox>
      </StHeader>
    </>
  );
};

export default AntdHeader;

const StHeader = styled(Header)`
  height: 70px;
  background-color: #eaf1f8;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;

  font-family: "MaplestoryOTFLight";

  position: fixed;
  z-index: 1;
  width: 100%;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const StImg = styled.img`
  border: none;
  width: 38px;
  height: 42px;
  margin-top: 15px;
`;
