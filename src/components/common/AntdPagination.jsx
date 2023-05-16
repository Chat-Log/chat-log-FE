import { Pagination } from "antd";
import React from "react";
import styled from "styled-components";

const AntdPagination = ({ total, itemsPerPage, currentPage, changePageHandler }) => {
  return (
    <StContainer>
      <Pagination defaultCurrent={1} current={currentPage} total={total} pageSize={itemsPerPage} onChange={changePageHandler} />
    </StContainer>
  );
};

export default AntdPagination;

const StContainer = styled.div`
  /* position: fixed */
  text-align: center;
  margin-top: 60px;
`;
