import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { CustomButton, CustomUser } from "../components/common";

import { PATH } from "../constants";

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

  return (
    <>
      <StHeader>
        <Link to={PATH.main}>
          <StTitle>CHAT GPT</StTitle>
        </Link>
        <StBox>
          <Button type="primary" size="middle" icon={<SettingOutlined />} onClick={showModal} style={{ background: "transparent", boxShadow: "none" }} />
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
            style={{ background: "transparent", boxShadow: "none" }}
          />

          <Link to={PATH.mypage}>
            <CustomUser />
          </Link>
          <div>{name}</div>
          <Link to={PATH.login}>
            <Button type="primary" size="middle" icon={<LogoutOutlined />} style={{ background: "transparent", boxShadow: "none" }} />
          </Link>
        </StBox>
      </StHeader>
    </>
  );
};

export default AntdHeader;

const StHeader = styled(Header)`
  height: 70px;
  background-color: #cecff4;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;

  font-family: "MaplestoryOTFLight";
  /* margin-bottom: 10px; */
`;

const StTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
