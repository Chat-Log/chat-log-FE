import React from "react";
import styled from "styled-components";
import { Card } from "antd";

export const AntdCard = ({ title, body, img, width, imgWd, height, href }) => {
  return (
    <>
      <StCard
        title={title}
        width={width}
        extra={
          <a href={href ? href : "https://platform.openai.com/account/usage"} target="_blank">
            More
          </a>
        }
      >
        <StBody>{body}</StBody>
        <StImg src={img} imgWd={imgWd} height={height}></StImg>
      </StCard>
    </>
  );
};

export default AntdCard;

const StCard = styled(Card)`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  border: 2px solid #cecff4;
  :where(.css-dev-only-do-not-override-1vtf12y).ant-card .ant-card-head {
    border-bottom: 1px solid #cecff4;
  }
  :where(.css-dev-only-do-not-override-1vtf12y).ant-card .ant-card-body {
    padding: 0px 24px 20px 24px;
  }
`;

const StBody = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 3rem;
`;

const StImg = styled.img`
  object-fit: cover;
  border: none;
  width: ${({ imgWd }) => imgWd};
  height: ${({ height }) => height};
`;
