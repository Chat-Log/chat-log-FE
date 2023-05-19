import React from "react";
import styled from "styled-components";

import { DatePicker } from "antd";

export const CustomDatePicker = ({ onChange }) => {
  return (
    <>
      <StDatePicker onChange={onChange} />
    </>
  );
};

const StDatePicker = styled(DatePicker)`
  margin: 15px 0px 0px 0px;
`;
