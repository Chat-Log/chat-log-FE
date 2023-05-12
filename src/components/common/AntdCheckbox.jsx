import { Checkbox } from "antd";
import styled from "styled-components";

const AntdCheckBox = ({ onChange, children, margin }) => {
  return (
    <>
      <StCheckBox onChange={onChange} margin={margin}>
        {children}
      </StCheckBox>
    </>
  );
};
export default AntdCheckBox;

const StCheckBox = styled(Checkbox)`
  margin: ${({ margin }) => margin};
`;
