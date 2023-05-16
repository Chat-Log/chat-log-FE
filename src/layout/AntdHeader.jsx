import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, Layout } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import AntdUser from "../components/common/AntdUser";
import { PATH } from "../constants/index";
import { Modal, Form, InputNumber, Input } from "antd";
const { Header } = Layout;

export const AntdHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nickname, setNickname] = useState("");
  const [historyLimit, setHistoryLimit] = useState(10);

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
        <a href={PATH.main} onClick={() => (window.location.href = PATH.main)}>
          <StTitle>CHAT GPT</StTitle>
        </a>
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
            // 헤더에 검색 부분 페이지 링크 연결
            style={{ background: "transparent", boxShadow: "none" }}
          />
          <Link to={PATH.mypage}>
            <AntdUser />
          </Link>
          <div>Lee Shin</div>
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
