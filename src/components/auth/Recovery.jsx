import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate, Link } from "react-router-dom";

import { CustomAlert, CustomButton, CustomTabs, CustomInput } from "../common/index";

import { api } from "../../core/api";
import { ICON, PATH, IMAGES } from "../../constants";

const Recovery = () => {
  const navigate = useNavigate();

  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("1");

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "phone":
        setPhoneNum(value);
        return;
      case "email":
        setEmail(value);
        return;
      case "oldPwd":
        setOldPwd(value);
        return;
      case "newPwd":
        setNewPwd(value);
        return;
      default:
        return;
    }
  };
  const items = [
    {
      key: "1",
      label: `이메일 찾기`,
      children: <CustomInput ph="PHONE NUMBER" prefix={ICON.phone} name="phone" value={phoneNum} onChange={changeHandler} />,
    },
    {
      key: "2",
      label: `비밀번호 초기화`,
      children: (
        <>
          <CustomInput ph="PHONE NUMBER" prefix={ICON.phone} mb="20px" name="phone" value={phoneNum} onChange={changeHandler} />
          <CustomInput ph="E-mail" prefix={ICON.user} name="email" value={email} onChange={changeHandler} />
        </>
      ),
    },
    {
      key: "3",
      label: `비밀번호 변경`,
      children: (
        <>
          <CustomInput ph="E-mail" prefix={ICON.user} name="email" mb="20px" value={email} onChange={changeHandler} />
          <CustomInput ph="현재 비밀번호" prefix={ICON.password} mb="20px" name="oldPwd" value={oldPwd} onChange={changeHandler} type="password" />
          <CustomInput ph="새로운 비밀번호" prefix={ICON.password} name="newPwd" value={newPwd} onChange={changeHandler} type="password" />
        </>
      ),
    },
  ];

  const submitHandler = async () => {
    if (key === "1") {
      try {
        const res = await api.getEmailApi({
          phone: phoneNum,
        });
        let result = res.data.data.emails.join(" ");
        CustomAlert({ errMsg: "등록된 이메일: " + result });
      } catch (error) {
        if (error.response.data.statusCode === "4402") {
          CustomAlert({ errMsg: "가입되지 않는 전화번호입니다.", icon: "error" });
        }
      }
    } else if (key === "2") {
      try {
        const res = await api.patchPwdApi({ email: email, phone: phoneNum });
        CustomAlert({ title: "초기화된 비밀번호: " + res.data.data.password, icon: "success" });
      } catch (error) {
        if (error.response.data.statusCode === "4402") {
          CustomAlert({ errMsg: "가입되지 않은 유저정보입니다.", icon: "error" });
        }
      }
    } else {
      try {
        const res = await api.postLoginApi({
          email: email,
          password: oldPwd,
        });
        if (res.status === 201) {
          localStorage.setItem("accessToken", "Bearer " + res.data.data.accessToken);
          localStorage.setItem("id", res.data.data.id);
          const resetPwdRes = await api.patchResetPwdApi({ oldPassword: oldPwd, newPassword: newPwd });
          CustomAlert({ errMsg: "변경된 비밀번호로 로그인 었습니다!" });
          navigate(PATH.home);
        }
      } catch (error) {
        if (error.response.data.statusCode === "4401") {
          CustomAlert({ errMsg: "존재하지 않는 회원입니다.", icon: "error" });
        } else if (error.response.data.statusCode === "4402") {
          CustomAlert({ errMsg: "비밀번호를 확인해주세요!", icon: "error" });
        } else {
          console.log(error.response.data);
        }
      }
    }
    setPhoneNum("");
    setEmail("");
    setNewPwd("");
    setOldPwd("");
  };

  const onChange = (key) => {
    setKey(key);
    setPhoneNum("");
    setEmail("");
    setNewPwd("");
    setOldPwd("");
  };

  return (
    <StContainer>
      <StBox>
        {IMAGES.logo}
        <StDiv>
          <Link to={PATH.login}>
            <CustomButton name="로그인" type="link" color="#4ea4f4" />
          </Link>
        </StDiv>
        <StForm>
          <CustomTabs width="360px" items={items} onChange={onChange} color="#4ea4f4" />
          <CustomButton name="확인" type="primary" width="250px" onClick={submitHandler} bgc="#4ea4f4" />
        </StForm>
      </StBox>
    </StContainer>
  );
};

export default Recovery;

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
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: end;
  width: 360px;
  height: 0px;
`;
