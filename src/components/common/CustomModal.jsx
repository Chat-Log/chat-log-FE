import React from "react";

import { Modal } from "antd";

import { CustomInput } from "../common";

export const CustomModal = ({ isModalOpen, handleOk, handleCancel, onChangeHandler, value }) => {
  return (
    <>
      <Modal title="API KEY를 등록해주세요!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="확인" cancelText="닫기">
        <CustomInput value={value} onChange={onChangeHandler} />
      </Modal>
    </>
  );
};
