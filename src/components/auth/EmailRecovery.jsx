import Button from "../common/Button";
import styled from "styled-components";
import Input from "../common/AntdInput";
import Tab from "../common/AntdTabs";

import { ICON } from "../../constants";

const items = [
  {
    key: "1",
    label: `이메일 찾기`,
    children: <Input ph="PHONE NUMBER" prefix={ICON.phone} />,
  },
  {
    key: "2",
    label: `비밀번호 찾기`,
    children: (
      <>
        <Input ph="PHONE NUMBER" prefix={ICON.phone} mb="20px" />
        <Input ph="E-mail" prefix={ICON.user} />
      </>
    ),
  },
];

const EmailRecovery = () => {
  return (
    <StContainer>
      <StBox>
        <StTitle>Chat Log</StTitle>
        <StForm>
          <Tab width="360px" items={items} />
          <Button name="확인" type="primary" width="250px" />
        </StForm>
      </StBox>
    </StContainer>
  );
};

export default EmailRecovery;

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
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StDiv = styled.div``;
