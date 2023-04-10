import { Radio, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";

const AntdSelect = () => {
  const [placement, SetPlacement] = useState("bottomLeft");

  return (
    <>
      <StSelect
        defaultValue="Gpt3.5-turbo"
        dropdownMatchSelectWidth={false}
        placement={placement}
        options={[
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
        ]}
      />
    </>
  );
};
export default AntdSelect;

const StSelect = styled(Select)`
  width: 120px;
`;
