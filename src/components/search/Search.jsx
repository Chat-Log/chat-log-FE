import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getSearch, __getTag } from "../../redux/modules/searchSlice";
import { __getModel } from "../../redux/modules/mainSlice";
import Card from "../card/Card";
import CardBox from "../card/CardBox";

import AntdCheckBox from "../common/AntdCheckbox";
import AntdCollapse from "../common/AntdCollapse";
import AntdContent from "../common/AntdContent";
import AntdDatePicker from "../common/AntdDatePicker";
import AntdMultipleSelect from "../common/AntdMultipleSelect";
import AntdRadio from "../common/AntdRadio";
import AntdSearch from "../common/AntdSearch";
import AntdSubHeader from "../common/AntdSubHeader";

const Search = () => {
  const dispatch = useDispatch();

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

  // 옵션선택한거 상태로 관리해서 보내자
  const changeRadioCheckedHandler = (e) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    dispatch(__getModel());
  }, []);

  useEffect(() => {
    dispatch(__getSearch({ pagesize: "100", pageindex: "1" }));
  }, []);

  useEffect(() => {
    dispatch(__getTag());
  }, []);

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
    dispatch(
      __getSearch({
        modelnames: selectedModel !== [] ? selectedModel : null,
        tagnames: selectedTag !== [] ? selectedTag : null,
        date: date !== "" ? date : null,
        searchtype: searchType,
        onlylastcompletions: onlyLastCompletion,
        query: query !== "" ? query : null,
        pagesize: "100",
        pageindex: "1",
      })
    );
  };

  return (
    <>
      <AntdSubHeader>
        <AntdRadio value={searchType} onChange={changeRadioCheckedHandler} />
        <AntdSearch width="500px" onChange={changeQueryHandler} onSearch={searchHandler} />
      </AntdSubHeader>
      <AntdContent of="auto">
        <AntdCollapse>
          <StAdvancedSearch>
            <div>
              <StLabel>모델:</StLabel> <AntdMultipleSelect ph="모델을 선택하세요" options={options.model} onChange={selectedModelHanlder} />
            </div>
            <div>
              <StLabel>태그:</StLabel> <AntdMultipleSelect ph="태그를 선택하세요" options={options.tag} onChange={selectedTagHanlder} />
            </div>
            <div>
              <StLabel>일시:</StLabel> <AntdDatePicker onChange={changeDateHandler} />
            </div>
            <div>
              <StLabel>분류: </StLabel>
              <AntdCheckBox margin="15px 0 10px 0 " onChange={changeCheckedHandler}>
                마지막 질문만 보기
              </AntdCheckBox>
            </div>
          </StAdvancedSearch>
        </AntdCollapse>
        <CardBox>
          {searchData[0]?.createdAt !== "" ? (
            searchData.map((data, index) => <Card key={index} title={data.topicTitle} question={data.question} answer={data.answer} tags={data.tagNames} createdAt={data.createdAt}></Card>)
          ) : (
            <StNoSearchedData>데이터가 없습니다</StNoSearchedData>
          )}
        </CardBox>
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
`;

const StNoSearchedData = styled.div`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin-top: 100px;
`;
