import { Radio } from "antd";
import styled from "styled-components";

export const CustomRadio = ({ onChange, value, option }) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      <StCustomRadio value={option.option1}>{option.옵션1}</StCustomRadio>
      <StCustomRadio value={option.option2}>{option.옵션2}</StCustomRadio>
      <StCustomRadio value={option.option3}>{option.옵션3}</StCustomRadio>
    </Radio.Group>
  );
};

const StCustomRadio = styled(Radio)`
  &:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: #4ea4f4;
  }
  .ant-radio-checked::after {
    border-color: #4ea4f4;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #4ea4f4;
    background-color: #4ea4f4;
  }
  .ant-radio-inner::after {
    background-color: white;
  }
`;
