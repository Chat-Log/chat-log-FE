import React from "react";
import styled from "styled-components";

import { DatePicker } from "antd";

const AntdDatePicker = ({ onChange }) => {
  return (
    <>
      <StDatePicker onChange={onChange} />
    </>
  );
};

export default AntdDatePicker;

const StDatePicker = styled(DatePicker)`
  margin: 15px 0px 0px 0px;
`;
