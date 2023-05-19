import { Input } from "antd";
import styled from "styled-components";

export const CustomInput = ({ size, ph, prefix, mb, suffix, width, onChange, type, name, value, disabled }) => (
  <>
    <StInput disabled={disabled} value={value} name={name} size={size} placeholder={ph} prefix={prefix} mb={mb} suffix={suffix} width={width} onChange={onChange} type={type} />
  </>
);

const StInput = styled(Input)`
  margin-bottom: ${({ mb }) => mb};
  width: ${({ width }) => width};
`;
