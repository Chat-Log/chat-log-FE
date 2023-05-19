import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch, __getTag } from "../redux/modules/searchSlice";
import { __getModel } from "../redux/modules/mainSlice";
import styled from "styled-components";

import { Card, CardBox } from "../components/card";

import { CustomCheckbox, CustomCollapse, CustomContent, CustomDatePicker, CustomMultipleSelect, CustomRadio, CustomSearch, CustomSubHeader, CustomPagination } from "../components/common";

const SearchPage = () => {
  const dispatch = useDispatch();

  // 페이지
  const [currentPage, setCurrentPage] = useState("1");
  const [itemsPerPage, setItemsPerPage] = useState("3");

  const searchData = useSelector((state) => state.search.data);
  const tagData = useSelector((state) => state.search.tagData);
  const modelData = useSelector((state) => state.main.modelData);

  const [tags, setTags] = useState(tagData);

  const [searchType, setSearchType] = useState("all");
  const [selectedModel, setSelectedModel] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [date, setDate] = useState("");
  const [onlyLastCompletion, setOnlyLastCompletion] = useState(false);
  const [query, setQuery] = useState("");

  const radioOptions = {
    option1: "all",
    option2: "question",
    option3: "answer",
    옵션1: "질문+답변",
    옵션2: "질문",
    옵션3: "답변",
  };

  // 옵션선택한거 상태로 관리해서 보내자
  const changeRadioCheckedHandler = (e) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    dispatch(__getModel());
  }, []);

  useEffect(() => {
    dispatch(__getSearch({ pagesize: itemsPerPage, pageindex: currentPage }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(__getTag());
  }, [dispatch]);

  const options = {
    model: modelData?.map((model) => {
      return { value: model };
    }),

    tag: tags.map((tag) => ({ value: tag })),
  };

  const selectedModelHanlder = (value) => {
    setSelectedModel(value);
  };

  const selectedTagHanlder = (value) => {
    setSelectedTag(value);
  };

  const changeDateHandler = (_, dateString) => {
    setDate(dateString);
  };

  const changeCheckedHandler = (e) => {
    setOnlyLastCompletion(e.target.checked);
  };

  const changeQueryHandler = (e) => {
    setQuery(e.target.value);
  };

  const searchHandler = () => {
    setCurrentPage("1");
    dispatch(
      __getSearch({
        modelnames: selectedModel !== [] ? selectedModel : null,
        tagnames: selectedTag !== [] ? selectedTag : null,
        date: date !== "" ? date : null,
        searchtype: searchType,
        onlylastcompletions: onlyLastCompletion,
        query: query !== "" ? query : null,
        pagesize: itemsPerPage,
        pageindex: "1",
      })
    );
  };

  // 페이지 번호가 변경되었을 때의 핸들러
  const changePageHandler = (page) => {
    setCurrentPage(page);
    dispatch(
      __getSearch({
        modelnames: selectedModel.length > 0 ? selectedModel : null,
        tagnames: selectedTag.length > 0 ? selectedTag : null,
        date: date !== "" ? date : null,
        searchtype: searchType,
        onlylastcompletions: onlyLastCompletion,
        query: query !== "" ? query : null,
        pagesize: itemsPerPage,
        pageindex: page,
      })
    );
  };

  return (
    <>
      <CustomSubHeader>
        <CustomRadio value={searchType} onChange={changeRadioCheckedHandler} option={radioOptions} />
        <CustomSearch width="500px" onChange={changeQueryHandler} onSearch={searchHandler} />
      </CustomSubHeader>
      <CustomContent of="auto">
        <CustomCollapse>
          <StAdvancedSearch>
            <div>
              <StLabel>모델:</StLabel> <CustomMultipleSelect ph="모델을 선택하세요" options={options.model} onChange={selectedModelHanlder} />
            </div>
            <div>
              <StLabel>태그:</StLabel> <CustomMultipleSelect ph="태그를 선택하세요" options={options.tag} onChange={selectedTagHanlder} />
            </div>
            <div>
              <StLabel>일시:</StLabel> <CustomDatePicker onChange={changeDateHandler} />
            </div>
            <div>
              <StLabel>분류: </StLabel>
              <CustomCheckbox margin="15px 0 10px 0 " onChange={changeCheckedHandler}>
                마지막 질문만 보기
              </CustomCheckbox>
            </div>
          </StAdvancedSearch>
        </CustomCollapse>
        <CardBox>
          {searchData[0]?.createdAt !== "" ? (
            searchData.map((data, index) => <Card key={index} title={data.topicTitle} question={data.question} answer={data.answer} tags={data.tagNames} createdAt={data.createdAt}></Card>)
          ) : (
            <StNoSearchedData>데이터가 없습니다</StNoSearchedData>
          )}
        </CardBox>
        <CustomPagination total={100} itemsPerPage={itemsPerPage} currentPage={currentPage} changePageHandler={changePageHandler} />
      </CustomContent>
    </>
  );
};

export default SearchPage;

const StLabel = styled.label`
  margin-left: 20px;
`;

const StAdvancedSearch = styled.div`
  display: flex;
  flex-direction: column;
`;

const StNoSearchedData = styled.div`
  text-align: center;

  margin-top: 100px;

  color: #888;

  font-size: 1.5rem;
`;
