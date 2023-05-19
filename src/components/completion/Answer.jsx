import React from "react";
import styled from "styled-components";

import { IMAGES } from "../../constants";

import { MarkdownRender } from "./";
import { reformatDate } from "../../func/func";

export const Answer = ({ model, createdAt, answer }) => {
  return (
    <StContainer>
      <StProfile url={IMAGES.alborz} />
      <StBody>
        <StNickname>
          {model} <p>{reformatDate(createdAt)}</p>
        </StNickname>
        <StContents>
          <MarkdownRender markdown={answer} overflow="none" height="auto" />
        </StContents>
      </StBody>
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  flex-direction: row;

  min-height: 70px;

  margin-bottom: 10px;
  padding: 20px;

  background: ${({ bg }) => bg || "#E9F2FF"};

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

  color: #2e2e2e;

  font-size: 1.2rem;
  line-height: 170%;
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
