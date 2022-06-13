import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GuideCategory from "../components/guide/catrogry/GuideCategory";
import GuideBox from "../components/guide/content/GuideBox";
import Header from "../components/header";

const MailGuide: NextPage = () => {
  const [offset, setOffset] = useState<number>(0);
  const [changeColor, setChangeColor] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<string>("메일 예절");

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  useEffect(() => {
    offset > 130 ? setChangeColor(true) : setChangeColor(false);
  }, [offset]);

  return (
    <HomeConrainer>
      <Header changeColor={changeColor} />
      <h1>
        메일 가이드를 통하여
        <br /> 쉽고 빠르게 메일을 보내요!
      </h1>
      <GuideCategory setSelectCategory={setSelectCategory} />
      <GuideBox selectCategory={selectCategory} />
    </HomeConrainer>
  );
};
export default MailGuide;

const HomeConrainer = styled.div`
  padding: 150px 0;
  width: 100%;
  height: 100%;
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
