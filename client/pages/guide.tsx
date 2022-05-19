import styled from "@emotion/styled";
import type { NextPage } from "next";
import GuideCategory from "../components/guide/catrogry/GuideCategory";
import Header from "../components/header";

const MailGuide: NextPage = () => {
  return (
    <HomeConrainer>
      <Header />
      <h1>
        메일 가이드를 통하여
        <br /> 쉽고 빠르게 메일을 보내요!
      </h1>
      <GuideCategory />
      <SelectedGuide>{}</SelectedGuide>
      <GuideContainer>
        <h1>강은빈님께서 보냈던 첫번째 제안 메일</h1>
      </GuideContainer>
    </HomeConrainer>
  );
};
export default MailGuide;

const HomeConrainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  gap: 100px;

  > h1 {
    text-align: center;
    color: white;
    font-weight: 500;
  }
`;

const GuideContainer = styled.section`
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid red;
  background: white;
  color: black;
  h1 {
    font-weight: 500;
  }
`;

const SelectedGuide = styled.h1`

`;
