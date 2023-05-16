import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { ICON, PATH } from "../../constants";

import Button from "../common/Button";

import AntdSelect from "../common/AntdSelect";
import AntdTag from "../common/AntdTag";
import AntdSearch from "../common/AntdSearch";
import AntdSubHeader from "../common/AntdSubHeader";
import AntdContent from "../common/AntdContent";
import AntdModal from "../common/AntdModal";
import { completionInfo, __patchGptKey, __postCompletion, __getTopic, __getModel, __patchTopicTilte } from "../../redux/modules/mainSlice";
import Answer from "../completion/Answer";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import Question from "../completion/Question";
import AntdInput from "../common/AntdInput";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const topicId = param.topicId;

  const completionData = useSelector((state) => state.main.data);
  const topicData = useSelector((state) => state.main.topicData);
  const modelData = useSelector((state) => state.main.modelData);

  const title = useSelector((state) => state.main?.topicTitle);

  // console.log(topicData?.title);

  let newtags = topicData?.tags?.map((tag) => tag.props.name);

  const [topicTitle, setTopicTitle] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt3.5_turbo");
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState([]);
  const [responses, setResponses] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [disabled, SetDisabled] = useState(true);

  // console.log(topicTitle);

  useEffect(() => {
    dispatch(__getModel());
    console.log("1");
  }, [dispatch]);

  useEffect(() => {
    if (topicId !== undefined) {
      dispatch(__getTopic(topicId));
      setQuestion("");
      setTopicTitle(title);
      console.log("2");
    }
  }, [topicId, dispatch]);

  // useEffect(() => {
  //   // 주소가 'http://localhost:3000/main'으로 변경되면 동작하는 로직
  //   if (location.pathname === "/main") {
  //     dispatch(completionInfo([]));
  //     setResponses("");
  //     setTopicTitle("");
  //   }
  // }, [location, dispatch]);

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

  // 토픽 제목 변경
  const changeTitleHandler = (e) => {
    setTopicTitle(e.target.value);
  };

  const submitTitleHandler = () => {
    SetDisabled(!disabled);
    setTopicTitle(title);
    if (!disabled) {
      dispatch(__patchTopicTilte({ topicId, title: topicTitle }));
    }
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
        setCreatedAt(new Date().toISOString());

        const reader = response.body.getReader();
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
            setTimeout(() => {
              setResponses(responseString);
            }, i * 1);
          }

          let match = buffer.match(/topicId:([^\n]*)\nendFlag/);
          let id = match ? match[1] : "";
          // navigate(PATH.main + "/" + id);

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
        <Button onClick={showModal} name="key 등록" />
        <AntdModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} onChangeHandler={changeApiKeyHandler} value={apiKey} />
      </AntdSubHeader>

      <AntdContent>
        <StTitleBox>
          <AntdInput disabled={disabled} value={topicTitle} onChange={changeTitleHandler} />
          <Button name={disabled ? "수정" : "완료"} bgc="#4ea4f4" color="white" onClick={submitTitleHandler} />
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

  //
  /* background-color: #f0f0f0; */
  /* border-top: 1px solid #ddd; */
`;

const StTagBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
