import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../card/Card";
import CardBox from "../card/CardBox";
import AntdContent from "../common/AntdContent";
import AntdSubHeader from "../common/AntdSubHeader";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch, __getTag } from "../../redux/modules/searchSlice";

const Tags = () => {
  const tagData = useSelector((state) => state.search.tagData);
  const searchData = useSelector((state) => state.search.data);

  const [selectedTags, setSelectedTags] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getTag());
  }, []);

  useEffect(() => {
    if (selectedTags.length > 0) {
      dispatch(__getSearch({ tagnames: selectedTags }));
    }
  }, [selectedTags]);

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
        {tagData.length === 0 ? (
          <NoSelectedTagMessage style={{ margin: "auto" }}>등록된 태그가 없습니다.</NoSelectedTagMessage>
        ) : (
          tagData.map((tag) => (
            <StyledTag key={tag} color={selectedTags.includes(tag) ? "blue" : ""} onClick={() => handleTagClick(tag)}>
              {tag}
            </StyledTag>
          ))
        )}
      </AntdSubHeader>
      <AntdContent>
        {selectedTags.length === 0 ? (
          <NoSelectedTagMessage>태그를 선택해주세요</NoSelectedTagMessage>
        ) : (
          <CardBox>
            {searchData?.map((item, index) => (
              <Card key={index} title={item?.title} question={item?.question} answer={item?.answer} tags={item?.tags} createdAt={item?.createdAt}></Card>
            ))}
          </CardBox>
        )}
      </AntdContent>
    </>
  );
};

export default Tags;

const StyledTag = styled(Tag)`
  cursor: pointer;
  min-width: 70px;
  min-height: 30px;
  line-height: 30px;
  text-align: center;
`;

const NoSelectedTagMessage = styled.div`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin-top: 100px;
  width: 100%;
`;
