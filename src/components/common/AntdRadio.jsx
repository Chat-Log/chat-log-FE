import { useState } from "react";
import styled from "styled-components";

import { Radio } from "antd";

const AntdRadio = ({ onChange, value }) => {
  // 컴포넌트 동적으로 사용 가능하게 만들어야함

  // const [value, setValue] = useState(1);

  // const onChange = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  // };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={"all"}>질문+답변</Radio>
      <Radio value={"question"}>질문</Radio>
      <Radio value={"answer"}>답변</Radio>
    </Radio.Group>
  );
};
export default AntdRadio;
