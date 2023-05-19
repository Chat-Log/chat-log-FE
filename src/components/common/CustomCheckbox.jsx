import { Checkbox } from "antd";
import styled from "styled-components";

export const CustomCheckbox = ({ onChange, children, margin }) => {
  return (
    <>
      <StCheckBox onChange={onChange} margin={margin}>
        {children}
      </StCheckBox>
    </>
  );
};

const StCheckBox = styled(Checkbox)`
  margin: ${({ margin }) => margin};
`;
