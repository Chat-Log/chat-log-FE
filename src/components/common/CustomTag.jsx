import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Input, Space, Tag, Tooltip, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { api } from "../../core/api";

export const CustomTag = ({ tags, setTags, getTags, topicId = null }) => {
  const { token } = theme.useToken();

  // console.log(getTags);
  useEffect(() => {
    setTags(getTags);
  }, [getTags]);

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    api.deleteTopicTagApi(topicId, removedTag);
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags?.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    if (inputValue !== "") {
      api.addTopicTagApi(topicId, inputValue);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  const tagInputStyle = {
    width: 78,
    verticalAlign: "top",
  };

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <StContainer>
      <Space size={[0, 8]} wrap>
        <Space size={[0, 8]} wrap>
          {tags?.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable
                style={{
                  userSelect: "none",
                }}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
        </Space>
        {inputVisible ? (
          <Input ref={inputRef} type="text" size="small" style={tagInputStyle} value={inputValue} onChange={handleInputChange} onBlur={handleInputConfirm} onPressEnter={handleInputConfirm} />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> 태그 추가
          </Tag>
        )}
      </Space>
    </StContainer>
  );
};

const StContainer = styled.div``;
