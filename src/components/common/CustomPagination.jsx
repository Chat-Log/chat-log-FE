import { Pagination } from "antd";
import React from "react";
import styled from "styled-components";

export const CustomPagination = ({ total, itemsPerPage, currentPage, changePageHandler }) => {
  return (
    <StContainer>
      <Pagination defaultCurrent={1} current={currentPage} total={total} pageSize={itemsPerPage} onChange={changePageHandler} />
    </StContainer>
  );
};

const StContainer = styled.div`
  text-align: center;
  margin-top: 60px;
`;
