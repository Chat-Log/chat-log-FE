import React from "react";
import styled from "styled-components";
import Card from "../card/Card";

import AntdCheckBox from "../common/AntdCheckbox";
import AntdCollapse from "../common/AntdCollapse";
import AntdContent from "../common/AntdContent";
import AntdDatePicker from "../common/AntdDatePicker";
import AntdMultipleSelect from "../common/AntdMultipleSelect";
import AntdSearch from "../common/AntdSearch";
import AntdSubHeader from "../common/AntdSubHeader";

const Search = () => {
  return (
    <>
      <AntdSubHeader>
        <AntdCheckBox>질문+답변</AntdCheckBox>
        <AntdCheckBox>질문</AntdCheckBox>
        <AntdCheckBox margin="0 40px 0 0">답변</AntdCheckBox>
        <AntdSearch width="500px"></AntdSearch>
      </AntdSubHeader>
      <AntdContent of="auto">
        <AntdCollapse>
          <StAdvancedSearch>
            <div>
              {/* 각각 옵션에 멀티플 셀렉트 넣고 데이터 받은거 넣으면됨  */}
              <StLabel>모델:</StLabel> <AntdMultipleSelect ph="모델을 선택하세요" />
            </div>
            <div>
              <StLabel>태그:</StLabel> <AntdMultipleSelect ph="태그를 선택하세요" />
            </div>
            <div>
              <StLabel>일시:</StLabel> <AntdDatePicker />
            </div>
            <div>
              <StLabel>분류:</StLabel> <AntdCheckBox margin="15px 0 10px 0 ">마지막 질문만 보기</AntdCheckBox>
            </div>
          </StAdvancedSearch>
        </AntdCollapse>
        <StCardBox>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </StCardBox>
      </AntdContent>
    </>
  );
};

export default Search;

const StLabel = styled.label`
  margin-left: 20px;
`;

const StAdvancedSearch = styled.div`
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.15); */
`;

const StCardBox = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
