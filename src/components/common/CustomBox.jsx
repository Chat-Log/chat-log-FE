import React from "react";
import styled from "styled-components";
import { Card } from "antd";

export const CustomBox = ({ title, body, img, width, imgWd, height, extra }) => {
  return (
    <>
      <StCard title={title} width={width} extra={extra}>
        <StBody>{body}</StBody>
        <StImg src={img} imgWd={imgWd} height={height}></StImg>
      </StCard>
    </>
  );
};

const StCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: ${({ width }) => width};

  margin: 20px;
  border: 2px solid #cecff4;

  :where(.css-dev-only-do-not-override-1vtf12y).ant-card .ant-card-head {
    font-family: "Pretendard-Bold";
    border-bottom: 1px solid #cecff4;
  }
  :where(.css-dev-only-do-not-override-1vtf12y).ant-card .ant-card-body {
    padding: 0px 24px 20px 24px;
    font-family: "MaplestoryOTFLight";
  }
`;

const StBody = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
`;

const StImg = styled.img`
  /* object-fit: cover; */
  border: none;
  width: ${({ imgWd }) => imgWd || "150px"};
  height: ${({ height }) => height || "50px"};
`;
