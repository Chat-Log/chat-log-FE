import styled from "styled-components";

import { Select } from "antd";

export const CustomSelect = ({ options, defaultValue, onChange, placement }) => {
  return (
    <>
      <StSelect defaultValue={defaultValue} dropdownMatchSelectWidth={false} placement={placement} options={options} onChange={onChange} />
    </>
  );
};

const StSelect = styled(Select)`
  width: 170px;
`;
