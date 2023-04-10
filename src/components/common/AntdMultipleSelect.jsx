import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const options = [
  {
    value: "Gpt3.5-turbo",
    label: "Gpt3.5-turbo",
  },
  {
    value: "Gpt4.0",
    label: "Gpt4.0",
  },
  {
    value: "Gpt3.5-davinchi",
    label: "Gpt3.5-davinchi",
  },
];
// for (let i = 10; i < 36; i++) {
//   options.push({
//     label: i.toString(36) + i,
//     value: i.toString(36) + i,
//   });
// }

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const AntdMultipleSelect = ({ ph }) => {
  return (
    <>
      <StSelect
        mode="multiple"
        allowClear
        placeholder={ph}
        // defaultValue={["a10", "c12"]}
        onChange={handleChange}
        options={options}
      />
    </>
  );
};

export default AntdMultipleSelect;

const StSelect = styled(Select)`
  width: 50%;
  margin: 15px 0px 0px 0px;
`;
