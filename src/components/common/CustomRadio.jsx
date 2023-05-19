import { Radio } from "antd";

export const CustomRadio = ({ onChange, value, option }) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={option.option1}>{option.옵션1}</Radio>
      <Radio value={option.option2}>{option.옵션2}</Radio>
      <Radio value={option.option3}>{option.옵션3}</Radio>
    </Radio.Group>
  );
};
