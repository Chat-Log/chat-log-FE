import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { __patchGptKey, __postCompletion, __getTopic, __getModel, __patchTopicTitle, __getTopics, updateTopic, clearTopicData } from "../redux/modules/mainSlice";
import { useParams } from "react-router-dom";

import { ICON } from "../constants";

import { Question, Answer } from "../components/completion";

import { CustomButton, CustomSelect, CustomTag, CustomSearch, CustomSubHeader, CustomContent, CustomModal, CustomInput, CustomAlert } from "../components/common";

import { Spin } from "antd";

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
  const [topicTitle, setTopicTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedModel, setSelectedModel] = useState("gpt3.5_turbo");
  // const [createdAt, setCreatedAt] = useState(null);
  const [question, setQuestion] = useState("");
  const [disabled, SetDisabled] = useState(true);

  const [completion, setCompletion] = useState([]);

  const [controller, setController] = useState(null);
  const [fetchState, setFetchState] = useState(true);
  const [showStopButton, setShowStopButton] = useState(false);
  const [tid, setTid] = useState();

  // scroll 감지
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [completion, topicData]);

  // redux 상태에서 로컬 상태로 topicTitle을 복사
  useEffect(() => {
    if (topicData) {
      setTopicTitle(topicData.title);
    } else {
      setTopicTitle("");
    }
  }, [topicData, topicId]);

  // GET/models
  useEffect(() => {
    dispatch(__getModel());
  }, []);

  useEffect(() => {
    controller?.abort();
  }, [topicId]);

  const [showSpinner, setShowSpinner] = useState(false);

  // GET/TopicId
  useEffect(() => {
    if (topicId !== undefined) {
      setShowSpinner(true);
      dispatch(__getTopic(topicId)).then(() => {
        setTimeout(() => {
          setShowSpinner(false);
        }, 100);
      });
    } else {
      dispatch(clearTopicData()); // Clear the topicData if topicId is undefined
    }
    setQuestion("");
    setCompletion([]);
  }, [topicId]);

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
    setApiKey("");
  };
  // modal 취소 버튼
  const cancelHandler = () => {
    setIsModalOpen(false);
    setApiKey("");
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

  // 질문 응답 중지
  const abortFetch = () => {
    if (fetchState) {
      controller?.abort();
      console.log("중지");
    }
    setFetchState(false);
    setShowStopButton(false);
  };

  // 질문 버튼
  const submitQuestionHandler = () => {
    if (question) {
      setShowStopButton(true);
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
      if (tid) {
        body.topicId = tid;
      }

      let newController = new AbortController();
      setController(newController);

      fetch("http://localhost:8080/topics/completion", {
        signal: newController.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok && !body.topicId) {
            console.log("업데이트");
            dispatch(updateTopic({ id: tid, title: question.slice(0, 8) }));
          } else if (response.status === 400) {
            CustomAlert({ errMsg: "API 키를 확안해주세요.", icon: "error" });
          } else if (response.status === 500) {
            CustomAlert({ errMsg: "서버오류 입니다. 다시한번 질문해주세요!", icon: "warning" });
          }

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

            let match = buffer.match(/topicId:([^\n]*)\nendFlag/);
            let id = match ? match[1] : "";
            setTid(id);

            reader.read().then(processText);
          });
          setQuestion("");
        })
        .catch((error) => {
          console.error("Stream error:", error);
        });
    } else {
      CustomAlert({ title: "질문을 입력해주세요!", icon: "warning" });
    }
  };

  // if (showSpinner) {
  //   return (
  //     <SpinnerContainer>
  //       <Spin size="large" />
  //     </SpinnerContainer>
  //   );
  // }

  return (
    <>
      <CustomContent of="hidden">
        <CustomSubHeader jc="space-between">
          <StP>질문하기</StP>
          <CustomButton onClick={showModal} name="key 등록" />
          <CustomModal isModalOpen={isModalOpen} handleOk={okHandler} handleCancel={cancelHandler} onChangeHandler={changeApiKeyHandler} value={apiKey} />
        </CustomSubHeader>
        <StTitleBox>
          <CustomInput disabled={topicId ? disabled : false} value={topicTitle} onChange={changeTitleHandler} />
          {topicId && <CustomButton name={disabled ? "수정" : "완료"} bgc="#4ea4f4" color="white" onClick={submitTitleHandler} />}
          <CustomSelect options={modelOptions} defaultValue={selectedModel} onChange={changeModelHandler} placement="bottomLeft" />
        </StTitleBox>

        <StTagBox>
          <CustomTag tags={tags} setTags={setTags} />
        </StTagBox>

        <StChatBox>
          {showSpinner && (
            <SpinnerContainer>
              <Spin size="large" />
            </SpinnerContainer>
          )}
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
          <div ref={chatEndRef} />
        </StChatBox>

        <StQBox>
          {showStopButton && <CustomButton onClick={abortFetch} name="중지" />}
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

  font-family: "MaplestoryOTFLight";
`;
const StChatBox = styled.div`
  position: relative;
  min-height: 62vh;

  padding: 20px;

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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(239, 233, 233, 0.3);
`;
