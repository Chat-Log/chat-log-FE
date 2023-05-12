import { Input, Space } from "antd";
import styled from "styled-components";

const { Search } = Input;

const AntdSearch = ({ mw, ph, size, eb, width, onSearch, onChange, value }) => {
  return (
    <>
      <StSearch mw={mw} width={width} placeholder={ph} enterButton={eb} size={size} onChange={onChange} onSearch={onSearch} value={value} />
    </>
  );
};

export default AntdSearch;

const StSearch = styled(Search)`
  width: ${({ width }) => width};
  max-width: ${({ mw }) => mw};
`;
