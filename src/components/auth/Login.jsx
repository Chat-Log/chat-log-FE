import { useState } from "react";
import styled from "styled-components";

import { useNavigate, Link } from "react-router-dom";

import { CustomButton, CustomAlert, CustomInput } from "../common/";

import { ICON, PATH, IMAGES } from "../../constants";
import { api } from "../../core/api";

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

  const submitHandler = async () => {
    try {
      const res = await api.postLoginApi({
        email: email,
        password: pwd,
      });
      if (res.status === 201) {
        // console.log(res.data.data);
        localStorage.setItem("accessToken", "Bearer " + res.data.data.accessToken);
        localStorage.setItem("id", res.data.data.id);
        localStorage.setItem("name", res.data.data.name);
      }
      navigate(PATH.home);
    } catch (error) {
      if (error.response.data.statusCode === "4401") {
        CustomAlert({ errMsg: "존재하지 않는 회원입니다.", icon: "error" });
      } else if (error.response.data.statusCode === "4402") {
        CustomAlert({ errMsg: "비밀번호를 확인해주세요!", icon: "error" });
      }
    }
  };

  return (
    <StContainer>
      <StBox>
        {IMAGES.logo}
        <StForm>
          <StDiv>
            <Link to={PATH.help}>
              <CustomButton name="ID/PWD 찾기" type="link" color="#4ea4f4" />
            </Link>
          </StDiv>
          <StLabel>이메일</StLabel>
          <CustomInput ph="E-mail" prefix={ICON.user} onChange={onChangeHandler} value={email} id="email" />
          <StLabel>비밀번호</StLabel>
          <CustomInput ph="PASSWARD" prefix={ICON.password} onChange={onChangeHandler} onPressEnter={submitHandler} value={pwd} id="pwd" type="password" />
          <StBtnBox>
            <CustomButton type="primary" name="로그인" width="250px" bgc="#4ea4f4" color="white" onClick={submitHandler} disabled={disabled} />
            <Link to={PATH.signup}>
              <CustomButton type="link" name="회원가입" color="#4ea4f4" />
            </Link>
          </StBtnBox>
        </StForm>
      </StBox>
    </StContainer>
  );
};

export default Login;

const StBtnBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

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

const StForm = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 360px;
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 10px;
`;

const StLabel = styled.label``;
