import React from "react";
import styled from "styled-components";
import { IMAGES } from "../../constants/index";
import { reformatDate } from "../auth/func";

const Question = ({ createdAt, question }) => {
  return (
    <StContainer bg="transparent">
      <StProfile url={IMAGES.me} />
      <StBody>
        <StNickname>
          me <p>{reformatDate(createdAt)}</p>
        </StNickname>
        <StContents>{question}</StContents>
      </StBody>
    </StContainer>
  );
};

export default Question;

const StContainer = styled.div`
  display: flex;
  flex-direction: row;

  background: ${({ bg }) => bg || "#E9F2FF"};
  min-height: 70px;

  padding: 20px;

  margin-bottom: 10px;

  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;
const StProfile = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 100%;
`;
const StBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;

  line-height: 170%;
  font-size: 1.2rem;
  color: #2e2e2e;
`;

const StNickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 3px;

  p {
    color: #2e2e2e;
    opacity: 0.7;
    margin-left: 10px;
  }
`;

const StContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
`;
