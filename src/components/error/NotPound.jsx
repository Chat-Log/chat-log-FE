import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Result, Button } from "antd";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <StContainer>
      <Result
        status="404"
        title="404"
        subTitle="잘못된 접근입니다."
        extra={
          <Button type="primary" onClick={goBack}>
            이전 페이지로 이동
          </Button>
        }
        style={{
          width: "450px",
          height: "650px",
        }}
      />
    </StContainer>
  );
};

export default NotFoundPage;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
