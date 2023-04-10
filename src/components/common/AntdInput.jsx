import { Input } from "antd";
import styled from "styled-components";

const AntdInput = ({ size, ph, prefix, mb, suffix, width }) => (
  <>
    <StInput size={size} placeholder={ph} prefix={prefix} mb={mb} suffix={suffix} width={width} />
  </>
);
export default AntdInput;

const StInput = styled(Input)`
  margin-bottom: ${({ mb }) => mb};
  width: ${({ width }) => width};
`;
