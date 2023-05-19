import React from "react";
import { Select } from "antd";
import styled from "styled-components";

export const CustomMultipleSelect = ({ ph, options, onChange }) => {
  return (
    <>
      <StSelect mode="multiple" allowClear placeholder={ph} onChange={onChange} options={options} />
    </>
  );
};

const StSelect = styled(Select)`
  width: 50%;
  margin: 15px 0px 0px 0px;
`;
