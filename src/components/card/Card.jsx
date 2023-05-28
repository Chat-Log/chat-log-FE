import React from "react";
import styled from "styled-components";

import { MarkdownRender } from "../completion";

import { IMAGES } from "../../constants";
import { reformatDate } from "../../func/func";

import { Tag } from "antd";

export const Card = ({ title, question, answer, tags, createdAt, onClick }) => {
  return (
    <StContainer onClick={onClick}>
      {title ? <StTitle>{title}</StTitle> : null}
      {question ? (
        <StDiv>
          <StQuestion>질문: {question?.length > 60 ? question.slice(0, 60) + " ..." : question}</StQuestion>
          <StCreatedAt>{reformatDate(createdAt)}</StCreatedAt>
        </StDiv>
      ) : null}
      <StContents>
        <StIcon url={IMAGES.alborz} />
        <StAnswer>
          <MarkdownRender markdown={answer} overflow="none" height="auto" />
        </StAnswer>
      </StContents>

      {tags ? (
        <StTags>
          {tags.map((tag, index) => (
            <Tag key={index} color="blue" style={{ padding: "5px 9px 5px 9px" }}>
              {tag}
            </Tag>
          ))}
        </StTags>
      ) : null}
    </StContainer>
  );
};

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;

  font-family: "MaplestoryOTFLight";

  background: #ffffff;
  box-shadow: 0px 4px 16px #eae2fd;
  border-radius: 15px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }

  cursor: pointer;
`;

const StTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: 80%;
  height: 22px;

  font-weight: 700;
  font-size: 1.7rem;
  margin-bottom: 10px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StQuestion = styled.div`
  height: 45px;

  font-size: 1.2rem;
  line-height: 130%;

  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #756966;
`;

const StIcon = styled.img`
  width: 38px;
  height: 38px;

  background-image: url(${(props) => props.url});

  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 100%;
`;

const StAnswer = styled.div`
  width: 100%;
`;

const StContents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 20px;
  gap: 20px;

  width: 100%;

  background: #eaf1f8;
  line-height: 150%;
  font-size: 1.2rem;

  border-radius: 20px;

  flex: none;
  order: 2;
  flex-grow: 0;
`;
const StTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  height: 22px;

  margin: 20px 10px 0 10px;

  flex: none;
  order: 3;
  flex-grow: 0;
`;

const StDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StCreatedAt = styled.div`
  margin-left: 20px;
`;
