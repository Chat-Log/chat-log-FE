import React from "react";
import styled from "styled-components";
import AntdCard from "../common/AntdCard";
import AntdContent from "../common/AntdContent";
import Grass from "./Grass";
import { IMAGES } from "../../constants/index";

const DashBoard = () => {
  return (
    <>
      <AntdContent>
        <Grass></Grass>
        <StBody>
          <AntdCard title="사용 토근수" body="126,560" width="300px" img={IMAGES.token} />
          <AntdCard title="예상 사용 요금" body="0.6$" width="300px" img={IMAGES.bill} />
          <AntdCard title="누적 질문 수" body="8,560" width="300px" img={IMAGES.question} />
        </StBody>
      </AntdContent>
    </>
  );
};

export default DashBoard;

const StBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  margin-top: 40px;
`;
