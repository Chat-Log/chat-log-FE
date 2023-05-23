import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch, __getTag } from "../redux/modules/searchSlice";
import styled from "styled-components";

import { Card, CardBox } from "../components/card";

import { CustomContent, CustomSubHeader, CustomPagination } from "../components/common";

import { Tag } from "antd";

const SortedByTagPage = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState("1");
  const [itemsPerPage, setItemsPerPage] = useState("3");
  const [selectedTags, setSelectedTags] = useState([]);

  const tagData = useSelector((state) => state.search.tagData);
  const searchData = useSelector((state) => state.search.data);
  const totalCount = useSelector((state) => state.search?.totalCount);

  useEffect(() => {
    dispatch(__getTag());
  }, []);

  useEffect(() => {
    if (selectedTags.length > 0) {
      dispatch(__getSearch({ tagnames: selectedTags, pagesize: itemsPerPage, pageindex: currentPage }));
    } else {
      dispatch(__getSearch({ tagnames: selectedTags, pagesize: itemsPerPage, pageindex: currentPage }));
    }
  }, [selectedTags, currentPage]);

  const changePageHandler = (page) => {
    setCurrentPage(page);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  return (
    <>
      <CustomSubHeader height="250px" margin="0px 0px 25px 0px">
        <StTagContainer>
          {tagData.length === 0 ? (
            <NoSelectedTagMessage style={{ margin: "auto" }}>등록된 태그가 없습니다.</NoSelectedTagMessage>
          ) : (
            tagData.map((tag) => (
              <StTag key={tag} color={selectedTags.includes(tag) ? "blue" : ""} onClick={() => handleTagClick(tag)}>
                {tag}
              </StTag>
            ))
          )}
        </StTagContainer>
      </CustomSubHeader>
      <CustomContent>
        <>
          <CardBox>
            {searchData.length > 0 ? (
              searchData?.map((item, index) => <Card key={index} title={item?.title} question={item?.question} answer={item?.answer} tags={item?.tags} createdAt={item?.createdAt}></Card>)
            ) : (
              <StNoSearchedData>데이터가 없습니다</StNoSearchedData>
            )}
          </CardBox>
          <CustomPagination total={totalCount} itemsPerPage={itemsPerPage} currentPage={currentPage} changePageHandler={changePageHandler} />
        </>
      </CustomContent>
    </>
  );
};

export default SortedByTagPage;

const StTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;

  max-width: 99%;
  padding: 10px;
`;

const StTag = styled(Tag)`
  text-align: center;

  min-width: 70px;
  min-height: 30px;

  margin: 5px;

  line-height: 30px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  font-family: "MaplestoryOTFLight";
`;

const NoSelectedTagMessage = styled.div`
  text-align: center;

  width: 100%;

  margin-top: 100px;

  color: #888;

  font-size: 1.5rem;
`;

const StNoSearchedData = styled.div`
  text-align: center;

  margin: 200px 0 600px 0;

  color: #888;

  font-size: 1.5rem;
`;
