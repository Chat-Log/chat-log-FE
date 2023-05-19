import React from "react";
import styled from "styled-components";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function BlockQutoe(children) {
  return (
    <StBlockQutoe>
      <span>{children.children}</span>
    </StBlockQutoe>
  );
}

export const MarkdownRender = ({ markdown, height, fontsize, margin, overflow, cursor, onClick, color }) => {
  return (
    <StMarkDown fontsize={fontsize} color={color} margin={margin} overflow={overflow} cursor={cursor} onClick={onClick}>
      <StTableContainer height={height}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          children={markdown}
          components={{
            blockquote: BlockQutoe,
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter children={String(children).replace(/\n$/, "")} language={match[1]} {...props} />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        ></ReactMarkdown>
      </StTableContainer>
    </StMarkDown>
  );
};

const StMarkDown = styled.div`
  margin: ${({ margin }) => margin || "0"};

  color: ${({ color }) => color || "gray"};

  font-size: ${({ fontsize }) => fontsize || "16px"};
  line-height: 2.5rem;

  overflow-y: ${({ overflow }) => overflow || "auto"};
  cursor: ${({ cursor }) => cursor || "default"};
`;

// 표일 때
const StTableContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || "200px"};

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #ccc;
    padding: 5px;
  }
`;

const StBlockQutoe = styled.blockquote`
  width: 97%;

  margin-left: 0;
  padding: 0 0.8rem;

  color: white;
  background-color: var(--color-light-gray);

  border-left: 5px solid var(--color-deep-red);
  span {
    color: white;
    background-color: transparent;
  }
`;
