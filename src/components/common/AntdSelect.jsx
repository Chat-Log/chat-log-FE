import { Radio, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";

const AntdSelect = ({ options, defaultValue, onChange }) => {
  const [placement, SetPlacement] = useState("bottomLeft");

  return (
    <>
      <StSelect defaultValue={defaultValue} dropdownMatchSelectWidth={false} placement={placement} options={options} onChange={onChange} />
    </>
  );
};
export default AntdSelect;

const StSelect = styled(Select)`
  width: 170px;
`;
