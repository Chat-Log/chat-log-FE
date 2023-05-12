import { useEffect, useState } from "react";

import Button from "../common/Button";
import styled from "styled-components";
import Input from "../common/AntdInput";
import { isValidEmail, isValidPassword, isValidPhoneNumber } from "./func";

import { ICON, PATH } from "../../constants/index";
import { useNavigate } from "react-router-dom";
import { api } from "../../core/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [pwdConfirmError, setPwdConfirmError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const disabled = email === "" || pwd === "" || pwdConfirm === "" || phoneNumber === "" || emailError || pwdError || pwdConfirmError || phoneNumberError;

  useEffect(() => {
    setPwdConfirmError(!(pwd === pwdConfirm));
  }, [pwd, pwdConfirm, email, phoneNumber]);

  const changeEmailHandler = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (isValidEmail(value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const changePwdHandler = (e) => {
    const { value } = e.target;
    setPwd(value);
    if (isValidPassword(value)) {
      setPwdError(false);
    } else {
      setPwdError(true);
    }
  };

  const changePwdConfirmHandler = (e) => {
    const { value } = e.target;
    setPwdConfirm(value);
  };

  const changePhoneNumberHandler = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);
    if (isValidPhoneNumber(value)) {
      setPhoneNumberError(false);
    } else {
      setPhoneNumberError(true);
    }
  };

  const submitHandler = async (e) => {
    try {
      await api.postSignUpApi({
        email: email,
        password: pwd,
        phone: phoneNumber,
        name: "kang san",
      });
      // navigate(PATH.login);
      console.log("회원가입 시도");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <StContainer>
      <StBox>
        <StTitle>Chat Log</StTitle>
        <StForm>
          <StDiv>
            <Button name="로그인" type="link" color="#1890FF" href={PATH.login} />
          </StDiv>
          <StLabel>이메일</StLabel>
          <Input ph="E-mail" prefix={ICON.user} onChange={changeEmailHandler} />
          {emailError && email !== "" && "올바른 이메일 형식으로 작성해주세요."}
          <StLabel>비밀번호</StLabel>
          <Input ph="PASSWARD" prefix={ICON.password} onChange={changePwdHandler} type="password" />
          {pwdError && pwd !== "" && "영문, 숫자, 특수문자가 모두 포함된 8~13자리로 작성해주세요."}
          <StLabel>비밀번호 확인</StLabel>
          <Input ph="CONFIRM PASSWARD" prefix={ICON.password} onChange={changePwdConfirmHandler} type="password" />
          {pwdConfirmError && pwdConfirm !== "" && "비밀번호가 일치하지 않습니다."}
          <StLabel>휴대폰 번호</StLabel>
          <Input ph="010-1111-2222" prefix={ICON.phone} onChange={changePhoneNumberHandler} />
          {phoneNumberError && phoneNumber !== "" && "올바른 휴대폰 번호 형식으로 작성해주세요."}
        </StForm>
        <Button type="primary" name="회원가입" width="250px" bgc="#8FC6FA" disabled={disabled} onClick={submitHandler} />
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

const StDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 360px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
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
