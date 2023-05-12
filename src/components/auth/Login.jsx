import { useState } from "react";
import Button from "../common/Button";
import styled from "styled-components";
import Input from "../common/AntdInput";

import { ICON, PATH } from "../../constants/index";
import { api } from "../../core/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const disabled = email === "" || pwd === "";

  const onChangeHandler = (e) => {
    const { placeholder, value } = e.target;

    switch (placeholder) {
      case "E-mail":
        setEmail(value);
        return;
      case "PASSWARD":
        setPwd(value);
        return;
      default:
        return;
    }
  };

  const onSubmitHandler = async () => {
    try {
      const res = await api.postLoginApi({
        email: email,
        password: pwd,
      });
      if (res.status === 201) {
        localStorage.setItem("accessToken", "Bearer " + res.data.data.accessToken);
        localStorage.setItem("id", res.data.data.id);
      }
      navigate(PATH.main);
    } catch (error) {
      if (error.response.data.statusCode === "4401") {
        alert("존재하지 않는 회원입니다.");
      }
    }
  };

  return (
    <StContainer>
      <StBox>
        <StTitle>Chat Log</StTitle>
        <StForm>
          <StDiv>
            {/* <Button name="로그인" type="link" color="#1890FF" /> */}
            <Button name="ID/PWD 찾기" type="link" color="#1890FF" href={PATH.forgot} />
          </StDiv>
          <Input ph="E-mail" prefix={ICON.user} onChange={onChangeHandler} value={email} id="email" />
          <Input ph="PASSWARD" prefix={ICON.password} onChange={onChangeHandler} value={pwd} id="pwd" type="password" />
          <Button type="primary" name="로그인" width="250px" bgc="#8FC6FA" onClick={onSubmitHandler} disabled={disabled} />
          <Button type="link" href={PATH.signup} name="회원가입" color="#1890FF" />
        </StForm>
      </StBox>
    </StContainer>
  );
};

export default Login;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StBox = styled.div`
  width: 500px;
  height: 700px;

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

  letter-spacing: 0.005em;

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
  justify-content: end;
  width: 360px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
`;
