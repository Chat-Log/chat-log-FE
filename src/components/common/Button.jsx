import { Button } from "antd";
import styled from "styled-components";

const CustomBtn = ({ type, name, size, width, bgc, color, href, onClick, disabled }) => {
  return (
    <StButton type={type} size={size} width={width} bgc={bgc} color={color} href={href} onClick={onClick} disabled={disabled}>
      {name}
    </StButton>
  );
};

export default CustomBtn;

const StButton = styled(Button)`
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  background-color: ${({ bgc }) => bgc};
`;
