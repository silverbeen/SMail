import styled from "@emotion/styled";
import React from "react";
import MailInput from "./mailInput";
import Title from "./title";

const MailWrite = () => {
  return (
    <MailContainer>
      <Title
        title="메일 작성"
        subTitle="다양한 추천 멘트로 메일을 빠르게 보내요!"
      />
      <MailInput />
    </MailContainer>
  );
};

const MailContainer = styled.div`
  width: 400px;
  height: 100%;
`;

export default MailWrite;
