import { Button } from "antd";
import styled from "styled-components";

const CustomBtn = ({ type, name, size, width, bgc, color, src }) => {
  return (
    <StButton type={type} size={size} width={width} bgc={bgc} color={color}>
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
