import React from "react";
import { Select } from "antd";
import styled from "styled-components";

// for (let i = 10; i < 36; i++) {
//   options.push({
//     label: i.toString(36) + i,
//     value: i.toString(36) + i,
//   });
// }

const AntdMultipleSelect = ({ ph, options, onChange }) => {
  return (
    <>
      <StSelect
        mode="multiple"
        allowClear
        placeholder={ph}
        // defaultValue={["a10", "c12"]}
        onChange={onChange}
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
