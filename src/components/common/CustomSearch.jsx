import styled from "styled-components";
import { Input } from "antd";

const { Search } = Input;

export const CustomSearch = ({ mw, ph, size, eb, width, onSearch, onChange, value }) => {
  return (
    <>
      <StSearch mw={mw} width={width} placeholder={ph} enterButton={eb} size={size} onChange={onChange} onSearch={onSearch} value={value} />
    </>
  );
};

const StSearch = styled(Search)`
  width: ${({ width }) => width};
  max-width: ${({ mw }) => mw};

  .ant-input-search-button {
    background-color: #4ea4f4;
    border-color: #4ea4f4;
  }
`;
