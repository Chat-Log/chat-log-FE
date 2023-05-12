import React from "react";
import styled from "styled-components";

import { Modal } from "antd";

import AntdInput from "./AntdInput";

const AntdModal = ({ isModalOpen, handleOk, handleCancel, onChangeHandler, value }) => {
  return (
    <>
      <Modal title="API KEY를 등록해주세요!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="확인" cancelText="닫기">
        <AntdInput value={value} onChange={onChangeHandler} />
      </Modal>
    </>
  );
};

export default AntdModal;
