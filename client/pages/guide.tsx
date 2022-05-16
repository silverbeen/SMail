import styled from "@emotion/styled";
import type { NextPage } from "next";
import Header from "../components/header";

const MailGuide: NextPage = () => {
  return (
    <HomeConrainer>
      <Header />
      <h1>
        메일 가이드를 통하여
        <br /> 쉽고 빠르게 메일을 보내요!
      </h1>
      <GuideCategory>
        <span>메일 예절</span>
        <span>답장률 높이는 제안</span>
        <span>공고 메일</span>
        <span>비지니스 메일</span>
        <span>섭외 메일</span>
      </GuideCategory>
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

  h1 {
    text-align: center;
    color: white;
    font-weight: 500;
  }
`;

const GuideCategory = styled.section`
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: white;
  row-gap: 20px;
  column-gap: 70px;

  span {
    font-size: 18px;
    color: #eef6fb;
    cursor: pointer;
  }

  span:nth-child(2) {
    font-size: 24px;
    color: white;
  }
`;
