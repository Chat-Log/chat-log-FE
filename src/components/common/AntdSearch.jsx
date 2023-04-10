import { Input, Space } from "antd";
import styled from "styled-components";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const AntdSearch = ({ ph, size, eb, width }) => {
  return (
    <>
      <StSearch width={width} placeholder={ph} enterButton={eb} size={size} onSearch={onSearch} />
    </>
  );
};

export default AntdSearch;

const StSearch = styled(Search)`
  width: ${({ width }) => width};
`;
