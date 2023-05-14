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
    // 가져온 태그들을 아래의 value: "" 에 넣어준다
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
          {searchData[0].createdAt !== "" ? (
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

// 아래의 형태로 데이터가옴
// {
//   "data": [
//     {
//       "completionId": 45,
//       "question": "How do I use NestJS?",
//       "answer": "To use NestJS, follow these steps:\n\n1. Install Node.js and npm on your machine if it's not already done.\n\n2. Install NestJS CLI globally using npm command:\n\n```bash\n$ npm i -g @nestjs/cli\n```\n\n3. Create a new NestJS application using Nest CLI:\n\n```bash\n$ nest new my-app\n```\n\n4. Start the development server and watch for changes:\n\n```bash\n$ npm run start:dev\n```\n\n5 Create a new controller:\n\n```bash\n$ nest generate controller product\n```\n\nThis will generate a new controller in the app/controllers directory with a ProductController class.\n\n6. Create a new service:\n\n```bash\n$ nest generate service product\n```\n\nThis will generate a new service in the app/services directory with a ProductService class.\n\n7. Define endpoints in your controller:\n\n```typescript\n// app/controllers/product.controller.ts\nimport { Controller, Get } from '@nestjs/common';\nimport { ProductService } from '../services/product.service';\n\n@Controller('product')\nexport class ProductController {\n  constructor(private readonly productService: ProductService) {}\n\n  @Get()\n  findAll(): string {\n    return this.productService.findAll();\n  }\n}\n```\n\n8. Define methods in your service:\n\n```typescript\n// app/services/product.service.ts\nimport { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ProductService {\n  findAll(): string {\n    return 'All products';\n  }\n}\n```\n\n9. Browse to http://localhost:3000/product to see the response from your endpoint.\n\n10. Start building your application by adding more endpoints, models, and business logic.\n\n11. Once your application is ready, build it using:\n\n```bash\n$ npm run build\n```\n\n12. Deploy your application to the cloud or a server and start serving your API.",
//       "topicTitle": "topictitle123",
//       "tagNames": [],
//       "createdAt": "2023-05-06T11:45:42.000Z",
//       "modelName": "gpt3.5_turbo"
//     },
//     {
//       "completionId": 44,
//       "question": "How do I use NestJS?",
//       "answer": "To use NestJS, follow these steps:\n\n1. Install Node.js and npm on your machine.\n\n2. Install NestJS CLI by running the following command in your terminal:\n\n```\nnpm i -g @nestjs/cli\n```\n\n3. Create a new NestJS project by running the following command:\n\n```\nnest new project-name\n```\n\n4. Navigate to the project directory by running the following command:\n\n```\ncd project-name\n```\n\n5. Start the development server by running the following command:\n\n```\nnpm run start:dev\n```\n\n6. Create a new controller by running the following command:\n\n```\nnest g controller controller-name\n```\n\n7. Define the routes and handlers for the controller.\n\n8. Create a new service by running the following command:\n\n```\nnest g service service-name\n```\n\n9. Define the business logic for the service.\n\n10. Inject the service into the controller and use it to handle requests.\n\n11. Test the API endpoints using tools like Postman or curl.\n\n12. Deploy the NestJS application to a server or cloud platform like AWS or Heroku.",
//       "topicTitle": "topictitle",
//       "tagNames": [],
//       "createdAt": "2023-05-05T17:44:53.000Z",
//       "modelName": "gpt3.5_turbo"
//     }
//   ],
//   "message": "success"
// }

// http://localhost:8080/topics/completions?tagnames=네트워크&tagnames=운영체제&date=2023-05-06&searchtype=question&onlylastcompletions=true
