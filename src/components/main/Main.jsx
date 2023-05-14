import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { ICON, PATH } from "../../constants";

import { Button } from "antd";

import AntdSelect from "../common/AntdSelect";
import AntdTag from "../common/AntdTag";
import AntdSearch from "../common/AntdSearch";
import AntdSubHeader from "../common/AntdSubHeader";
import AntdContent from "../common/AntdContent";
import AntdModal from "../common/AntdModal";
import { completionInfo, __patchGptKey, __postCompletion, __getTopicApi, __getModel } from "../../redux/modules/mainSlice";
import Answer from "../completion/Answer";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import Question from "../completion/Question";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const topicId = param.topicId;

  const completionData = useSelector((state) => state.main.data);
  const topicData = useSelector((state) => state.main.topicData);
  const modelData = useSelector((state) => state.main.modelData);
  console.log(completionData[0]);

  let newtags = topicData?.tags?.map((tag) => tag.props.name);

  const [topicTitle, setTopicTitle] = useState("제목을 입력해주세요");
  const [selectedModel, setSelectedModel] = useState("gpt3.5_turbo");
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState([]);
  const [responses, setResponses] = useState("");
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    dispatch(__getModel());
  }, []);

  useEffect(() => {
    if (topicId !== undefined) {
      dispatch(__getTopicApi(topicId));
      setQuestion("");
    }
  }, [topicId, completionData[0]]);

  useEffect(() => {
    // 주소가 'http://localhost:3000/main'으로 변경되면 동작하는 로직
    if (location.pathname === "/main") {
      dispatch(completionInfo([]));
      setResponses("");
    }
  }, [location]);

  // api key 관리
  const [apiKey, setApiKey] = useState("");

  const changeApiKeyHandler = (e) => {
    setApiKey(e.target.value);
  };

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const id = localStorage.getItem("id");
  const handleOk = () => {
    if (apiKey !== "") {
      dispatch(__patchGptKey({ userId: id, gptKey: apiKey }));
    }
    setIsModalOpen(false);
  };

  // api 키 등록 확인하고 안에 내용 초기화 하는 작업 해야함

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeTitleHandler = (e) => {
    setTopicTitle(e.target.value);
  };

  // gpt 모델 관련
  const modelOptions = modelData?.map((model) => {
    return {
      value: model,
      label: model,
    };
  });

  const changeModelHandler = (value, option) => {
    setSelectedModel(value);
  };

  // 질문 관련 input 관리
  const inputChangeHandler = (e) => {
    setQuestion(e.target.value);
  };

  // 질문 버튼
  const submitQuestionHandler = () => {
    dispatch(
      completionInfo({
        modelName: selectedModel,
        question: question,
        tagNames: tags,
      })
    );

    // topicID에 따른 request body
    let body = {
      modelName: selectedModel,
      question: question,
      tagNames: tags,
      topicTitle: topicTitle,
    };

    if (topicId) {
      body.topicId = topicId;
    }

    fetch("http://localhost:8080/topics/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        setCreatedAt(new Date().toISOString());

        const reader = response.body.getReader();
        console.log(reader);
        let buffer = "";
        reader.read().then(function processText({ done, value }) {
          if (done) {
            console.log("Stream ended");
            return;
          }

          buffer += new TextDecoder().decode(value);
          const lines = buffer.split("\n").filter((line) => line);

          let responseString = "";

          for (let i = 2; i < lines.length; i++) {
            responseString += lines[i] + "\n";
            // console.log(i, responseString);
            setTimeout(() => {
              setResponses(responseString);
            }, i * 1); // adjust the time as needed
          }

          // setResponses((prevResponses) => [...prevResponses, ...lines]);
          // console.log(buffer);
          // console.log(lines);

          let match = buffer.match(/topicId:([^\n]*)\nendFlag/);
          let id = match ? match[1] : "";
          // console.log(id);
          navigate(PATH.main + "/" + id);

          // Recursively call processText() to read the next chunk of text
          reader.read().then(processText);
        });
      })
      .catch((error) => {
        console.error("Stream error:", error);
      });
    setQuestion("");
  };

  // console.log(responses);

  return (
    <>
      <AntdSubHeader jc="space-between">
        <StP>질문하기</StP>
        <Button onClick={showModal}>key 등록</Button>
        <AntdModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} onChangeHandler={changeApiKeyHandler} value={apiKey} />
        {/* 등록버튼 클릭시 모달창 띄우고 키등록 하는 프로세스 작업해야함 */}
      </AntdSubHeader>

      <AntdContent>
        <StTitleBox>
          {/* <AntdInput ph="제목을 입력하세요" width="90%" onChange={changeTitleHandler} value={TopicTitle} />
          <Button type="primary">저장</Button> */}
          <AntdSelect options={modelOptions} defaultValue={selectedModel} onChange={changeModelHandler} />
        </StTitleBox>

        <StTagBox>
          <AntdTag tags={tags} setTags={setTags} />
        </StTagBox>

        <StChatBox>
          {topicId
            ? topicData?.completions?.map((data, index) => (
                <div key={index}>
                  <Question question={data.props.question} createdAt={data.props.createdAt} />
                  <Answer answer={data.props.answer} createdAt={data.props.createdAt} model={data.props.model.name} />
                </div>
              ))
            : null}
          {completionData[0].question ? <Question question={completionData[0].question} createdAt={createdAt} /> : null}
          {responses ? <Answer answer={responses} createdAt={createdAt} model={completionData[0].modelName} /> : null}
        </StChatBox>

        <StQBox>
          <AntdSearch ph="내용을 입력하세요" eb={ICON.send} value={question} size="large" mw="1000px" onSearch={submitQuestionHandler} onChange={inputChangeHandler} />
        </StQBox>
      </AntdContent>
    </>
  );
};
export default Main;

const StP = styled.p`
  font-size: 2rem;
`;

const StTitleBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 20px;
`;
const StChatBox = styled.div`
  height: 75%;

  padding: 20px;
  overflow: auto;

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
const StQBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100px;
  margin: 10px;
  padding: 10px;
`;

const StTagBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 10px 20px 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
