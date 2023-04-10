import Button from "../common/Button";
import styled from "styled-components";
import Input from "../common/AntdInput";

import { ICON } from "../../constants";

const SignUp = () => {
  return (
    <StContainer>
      <StBox>
        <StTitle>Chat Log</StTitle>
        <StForm>
          <StLabel>이메일</StLabel>
          <Input ph="ID" prefix={ICON.user} />
          <StLabel>비밀번호</StLabel>
          <Input ph="PASSWARD" prefix={ICON.password} />
          <StLabel>비밀번호 확인</StLabel>
          <Input ph="CONFIRM PASSWARD" prefix={ICON.password} />
          <StLabel>휴대폰 번호</StLabel>
          <Input ph="PHONE NUMBER" prefix={ICON.phone} />
        </StForm>
        <Button type="primary" name="회원가입" width="250px" bgc="#8FC6FA" />
      </StBox>
    </StContainer>
  );
};

export default SignUp;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StBox = styled.div`
  width: 500px;
  height: 700px;
  /* border: 1px solid black; */
  /* background-color: #d7e4f3; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StTitle = styled.div`
  font-family: "Avenir";
  font-style: normal;
  font-weight: 900;
  font-size: 64px;
  line-height: 38px;
  /* or 59% */

  /* display: flex; */
  /* align-items: center; */
  /* text-align: center; */
  letter-spacing: 0.005em;

  /* Character/Title .85 */

  color: rgba(0, 0, 0, 0.85);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StForm = styled.div`
  width: 360px;
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StLabel = styled.label``;
