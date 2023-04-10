import Button from "../common/Button";
import styled from "styled-components";
import Input from "../common/AntdInput";

import { ICON, IMAGES } from "../../constants";

const Login = () => {
  return (
    <StContainer>
      <StBox>
        <StTitle>Chat Log</StTitle>
        <StForm>
          <StDiv>
            <Button name="로그인" type="link" color="#1890FF" />
            <Button name="ID/PWD 찾기" type="link" color="#1890FF" />
          </StDiv>
          <Input ph="ID" prefix={ICON.user} />
          <Input ph="PASSWARD" prefix={ICON.password} />
          <Button type="primary" name="로그인" width="250px" bgc="#8FC6FA" />
          <Button type="primary" name="카카오 로그인" width="250px" bgc="#fef01b" />
          <Button type="link" name="회원가입" color="#1890FF" />
        </StForm>
      </StBox>
    </StContainer>
  );
};

export default Login;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 150px; */
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
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 360px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
`;

const StButton = styled.button`
  width: 300px;
`;
