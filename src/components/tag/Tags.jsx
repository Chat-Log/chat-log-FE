import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../card/Card";
import CardBox from "../card/CardBox";
import AntdContent from "../common/AntdContent";
import AntdSubHeader from "../common/AntdSubHeader";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch, __getTag } from "../../redux/modules/searchSlice";

import AntdPagination from "../common/AntdPagination";

const Tags = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("1");
  const [itemsPerPage, setItemsPerPage] = useState("3");

  const tagData = useSelector((state) => state.search.tagData);
  const searchData = useSelector((state) => state.search.data);
  // console.log(searchData);

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    dispatch(__getTag());
  }, []);

  useEffect(() => {
    if (selectedTags.length > 0) {
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
      <AntdSubHeader height="250px" margin="0px 0px 25px 0px">
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
      </AntdSubHeader>
      <AntdContent>
        {selectedTags.length === 0 ? (
          <NoSelectedTagMessage>태그를 선택해주세요</NoSelectedTagMessage>
        ) : (
          <>
            <CardBox>
              {searchData.length > 0 ? (
                searchData?.map((item, index) => <Card key={index} title={item?.title} question={item?.question} answer={item?.answer} tags={item?.tags} createdAt={item?.createdAt}></Card>)
              ) : (
                <StNoSearchedData>데이터가 없습니다</StNoSearchedData>
              )}
            </CardBox>
            <AntdPagination total={15} itemsPerPage={itemsPerPage} currentPage={currentPage} changePageHandler={changePageHandler} />
          </>
        )}
      </AntdContent>
    </>
  );
};

export default Tags;

const StTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 99%;
  gap: 7px;

  padding: 10px; // 컨테이너에 패딩 추가
  /* background-color: rgb(233, 234, 255); // 컨테이너의 배경색 변경 */
  /* border-radius: 10px; */
`;

const StTag = styled(Tag)`
  cursor: pointer;
  min-width: 70px;
  min-height: 30px;
  line-height: 30px;
  text-align: center;

  /* background-color: white; */

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); // 태그에 그림자 추가
  margin: 5px; // 태그 주위에 마진 추가
`;

const NoSelectedTagMessage = styled.div`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin-top: 100px;
  width: 100%;
`;

const StNoSearchedData = styled.div`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin: 200px 0 600px 0;
  /* margin-top: 100px; */
`;
