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
        {/* <StTitle>Chat Log</StTitle> */}
        <StImg src={IMAGES.chatlog} />
        <StForm>
          <StDiv>
            <Link to={PATH.help}>
              <CustomButton name="ID/PWD 찾기" type="link" color="#1890FF" />
            </Link>
          </StDiv>
          <StLabel>이메일</StLabel>
          <CustomInput ph="E-mail" prefix={ICON.user} onChange={onChangeHandler} value={email} id="email" />
          <StLabel>비밀번호</StLabel>
          <CustomInput ph="PASSWARD" prefix={ICON.password} onChange={onChangeHandler} value={pwd} id="pwd" type="password" />
          <StBtnBox>
            <CustomButton type="primary" name="로그인" width="250px" bgc="#8FC6FA" onClick={submitHandler} disabled={disabled} />
            <Link to={PATH.signup}>
              <CustomButton type="link" name="회원가입" color="#1890FF" />
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

const StImg = styled.img`
  border: none;
  width: 370px;
  height: 240px;
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
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
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
