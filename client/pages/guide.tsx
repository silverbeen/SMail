import styled from "@emotion/styled";
import type { NextPage } from "next";
import Header from "../components/header";

const MailGuide: NextPage = () => {
  return (
    <HomeConrainer>
      <Header />
    </HomeConrainer>
  );
};
export default MailGuide;

const HomeConrainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
