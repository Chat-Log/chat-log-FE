import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
// 중간줄 구현
import remarkGfm from "remark-gfm";

//
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function BlockQutoe(children) {
  return (
    <BlockQutoeStyle>
      <span>{children.children}</span>
    </BlockQutoeStyle>
  );
}

const MarkdownRender = ({ markdown, height, fontsize, margin, overflow, cursor, onClick, color }) => {
  // console.log(markdown);

  return (
    <MarkDownStyle fontsize={fontsize} color={color} margin={margin} overflow={overflow} cursor={cursor} onClick={onClick}>
      <TableContainer height={height}>
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
      </TableContainer>
    </MarkDownStyle>
  );
};

const MarkDownStyle = styled.div`
  font-size: ${({ fontsize }) => fontsize || "16px"};
  line-height: 2.5rem;
  overflow-y: ${({ overflow }) => overflow || "auto"};
  margin: ${({ margin }) => margin || "0"};
  color: ${({ color }) => color || "gray"};
  cursor: ${({ cursor }) => cursor || "default"};
`;

// 표일 때
const TableContainer = styled.div`
  height: ${({ height }) => height || "200px"};
  width: 100%;
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

const BlockQutoeStyle = styled.blockquote`
  width: 97%;
  padding: 0 0.8rem;
  border-left: 5px solid var(--color-deep-red);
  margin-left: 0;
  background-color: var(--color-light-gray);
  color: white;
  span {
    color: white;
    background-color: transparent;
  }
`;

export default MarkdownRender;
