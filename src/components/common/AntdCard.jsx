import React from "react";
import styled from "styled-components";
import { Card } from "antd";

export const AntdCard = ({ title, body, img, width }) => {
  return (
    <>
      <StCard title={title} width={width} extra={<a href="https://itprogramming119.tistory.com/entry/React-Objects-are-not-valid-as-a-React-child-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95">More</a>}>
        <StBody>{body}</StBody>
        <StImg src={img}></StImg>
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
  border: 1px solid black;
  :where(.css-dev-only-do-not-override-1vtf12y).ant-card .ant-card-head {
    border-bottom: 1px solid black;
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
`;
