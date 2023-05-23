import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { __patchGptKey, __postCompletion, __getTopic, __getModel, __patchTopicTitle, __getTopics } from "../redux/modules/mainSlice";
import { useParams } from "react-router-dom";

import { ICON } from "../constants";

import { Question, Answer } from "../components/completion";

import { CustomButton, CustomSelect, CustomTag, CustomSearch, CustomSubHeader, CustomContent, CustomModal, CustomInput } from "../components/common";

const MainPage = () => {
  // react-router-dom
  const param = useParams();
  const topicId = param.topicId;

  // redux
  const dispatch = useDispatch();

  // redux store
  const topicData = useSelector((state) => state.main.topicData);
  const modelData = useSelector((state) => state.main.modelData);

  // state
  const [topicTitle, setTopicTitle] = useState(topicData?.title);
  const [tags, setTags] = useState([]);
  const [selectedModel, setSelectedModel] = useState("gpt3.5_turbo");
  // const [createdAt, setCreatedAt] = useState(null);
  const [question, setQuestion] = useState("");
  const [disabled, SetDisabled] = useState(true);

  // GET/models
  useEffect(() => {
    dispatch(__getModel());
  }, []);

  // GET/TopicId
  useEffect(() => {
    dispatch(__getTopic(topicId));
    setQuestion("");
    setCompletion([]);
  }, [topicId, topicTitle]);

  // api key 관리
  const [apiKey, setApiKey] = useState("");
  const changeApiKeyHandler = (e) => {
    setApiKey(e.target.value);
  };

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = localStorage.getItem("id");

  const showModal = () => {
    setIsModalOpen(true);
  };

  // modal 확인 버튼
  const okHandler = () => {
    if (apiKey !== "") {
      dispatch(__patchGptKey({ userId: id, gptKey: apiKey }));
    }
    setIsModalOpen(false);
  };
  // modal 취소 버튼
  const cancelHandler = () => {
    setIsModalOpen(false);
  };

  // 토픽 제목 변경
  const changeTitleHandler = (e) => {
    setTopicTitle(e.target.value);
  };

  const submitTitleHandler = () => {
    SetDisabled(!disabled);
    if (!disabled && topicTitle !== "" && topicId !== undefined) {
      dispatch(__patchTopicTitle({ topicId, title: topicTitle })).then((res) => {
        if (__patchTopicTitle.fulfilled.match(res)) {
          dispatch(__getTopics());
        } else {
          console.log("토픽 수정 오류");
        }
      });
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

  const [completion, setCompletion] = useState([]);

  // 질문 버튼
  const submitQuestionHandler = () => {
    if (question) {
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
          // setCreatedAt(new Date().toISOString());

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
                setCompletion([
                  ...completion,
                  {
                    question: question,
                    modelName: selectedModel,
                    answer: responseString,
                    createdAt: new Date().toISOString(),
                  },
                ]);
              }, i * 1);
            }
            reader.read().then(processText);
          });
        })
        .catch((error) => {
          console.error("Stream error:", error);
        });
    }
    setQuestion("");
  };

  return (
    <>
      <CustomSubHeader jc="space-between">
        <StP>질문하기</StP>
        <CustomButton onClick={showModal} name="key 등록" />
        <CustomModal isModalOpen={isModalOpen} handleOk={okHandler} handleCancel={cancelHandler} onChangeHandler={changeApiKeyHandler} value={apiKey} />
      </CustomSubHeader>

      <CustomContent>
        <StTitleBox>
          <CustomInput disabled={topicId ? disabled : false} value={topicTitle ?? topicData?.title} onChange={changeTitleHandler} />
          {topicId && <CustomButton name={disabled ? "수정" : "완료"} bgc="#4ea4f4" color="white" onClick={submitTitleHandler} />}
          <CustomSelect options={modelOptions} defaultValue={selectedModel} onChange={changeModelHandler} placement="bottomLeft" />
        </StTitleBox>

        <StTagBox>
          <CustomTag tags={tags} setTags={setTags} />
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
          {completion?.map((data, index) => (
            <div key={index}>
              <Question question={data?.question} createdAt={data?.createdAt} />
              <Answer answer={data?.answer} createdAt={data?.createdAt} model={data?.modelName} />
            </div>
          ))}
        </StChatBox>

        <StQBox>
          <CustomSearch ph="내용을 입력하세요" eb={ICON.send} value={question} size="large" mw="1000px" onSearch={submitQuestionHandler} onChange={inputChangeHandler} />
        </StQBox>
      </CustomContent>
    </>
  );
};

export default MainPage;

const StP = styled.p`
  font-size: 2rem;

  font-family: "MaplestoryOTFLight";
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
  align-items: center;
  padding: 10px 20px 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;
