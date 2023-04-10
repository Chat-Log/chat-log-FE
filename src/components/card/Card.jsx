import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StContainer>
      <StTitle>#운영체제 CH1 </StTitle>
      <StQuestion>OSI 7Layer가 뭐야?</StQuestion>
      <StContents>
        OSI 7 Layer 모델은 컴퓨터 네트워크에서 데이터 통신 프로토콜의 기능을 7개의 레이어로 분리하여 정의한 것입니다. OSI는 Open Systems Interconnection의 약자로, 이 모델은 국제 표준화 기구(ISO)에서
        개발하였습니다. 7개의 레이어는 다음과 같습니다:
      </StContents>
      <StTags>안녕, 태그1 , 태그2</StTags>
    </StContainer>
  );
};

export default Card;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 10px;

  width: 1120px;
  height: 299px;

  background: #ffffff;
  box-shadow: 0px 4px 16px #eae2fd;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const StTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: 235px;
  height: 22px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StQuestion = styled.div`
  width: 1072px;
  height: 45px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;

  color: #756966;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const StContents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;

  width: 1072px;
  height: 128px;

  background: #eaf1f8;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`;
const StTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 135px;
  height: 22px;

  /* Inside auto layout */

  flex: none;
  order: 3;
  flex-grow: 0;
`;
