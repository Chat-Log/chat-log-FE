import React from "react";
import styled from "styled-components";
import { IMAGES } from "../../constants";
import { reformatDate } from "../auth/func";
import MarkdownRender from "../completion/MarkdownRender";

const Card = ({ title, question, answer, tags, createdAt }) => {
  return (
    <StContainer>
      {title ? <StTitle>{title}</StTitle> : null}
      {question ? (
        <StDiv>
          <StQuestion>질문: {question}</StQuestion>
          <StCreatedAt>{reformatDate(createdAt)}</StCreatedAt>
        </StDiv>
      ) : null}
      <StContents>
        <StIcon url={IMAGES.alborz} />
        <StAnswer>
          <MarkdownRender markdown={answer} overflow="none" height="auto" />
        </StAnswer>
      </StContents>

      {tags ? <StTags>{tags}</StTags> : null}
    </StContainer>
  );
};

export default Card;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 30px;
  gap: 10px;

  /* width: 90%;
  height: 299px; */

  background: #ffffff;
  box-shadow: 0px 4px 16px #eae2fd;
  border-radius: 15px;

  /* box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2); */
  /* border-radius: 8px; */

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const StTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: 80%;
  height: 22px;

  font-family: "Inter";
  font-weight: 700;
  font-size: 2.3rem;
  margin-bottom: 10px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StQuestion = styled.div`
  /* width: 100%; */
  height: 45px;

  font-family: "Inter";
  font-style: normal;
  font-size: 1.2rem;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;

  color: #756966;

  /* Inside auto layout */

  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

const StIcon = styled.img`
  width: 38px;
  height: 38px;

  background-image: url(${(props) => props.url});
  /* border-radius:  */

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
  /* height: 128px; */
  /* overflow: auto; */

  background: #eaf1f8;
  line-height: 150%;
  font-size: 1.2rem;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`;
const StTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  gap: 8px;

  /* width: 135px; */
  height: 22px;
  /* border: 1px solid black; */

  /* Inside auto layout */

  flex: none;
  order: 3;
  flex-grow: 0;
`;

const StDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
`;

const StCreatedAt = styled.div`
  margin-left: 20px;
`;
