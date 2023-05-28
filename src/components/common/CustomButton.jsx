import styled from "styled-components";

import { Button } from "antd";

export const CustomButton = ({ type, name, size, width, bgc, color, href, onClick, disabled }) => {
  return (
    <StButton type={type} size={size} width={width} bgc={bgc} color={color} href={href} onClick={onClick} disabled={disabled}>
      {name}
    </StButton>
  );
};

const StButton = styled(Button)`
  width: ${({ width }) => width};

  color: ${({ color }) => color};
  background-color: ${({ bgc }) => bgc};

  font-family: "MaplestoryOTFLight";

  &:hover {
    color: ${({ color }) => color} !important;
    background-color: ${({ bgc }) => bgc} !important;
  }
`;
