import React from "react";
import styled from "styled-components";

export const CardBox = ({ children }) => {
  return <StCardBox>{children}</StCardBox>;
};

export default CardBox;

const StCardBox = styled.div`
  margin: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
