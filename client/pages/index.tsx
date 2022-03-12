import styled from "@emotion/styled";
import type { NextPage } from "next";
import CategoryList from "../components/category";
import ContentBox from "../components/content/contentBox";
import Header from "../components/header";
import MailWrite from "../components/mailWrite";

const Home: NextPage = () => {
  return (
    <HomeConrainer>
      <Header />
      <ContentContainer>
        <div className="content_selected_container">
          <CategoryList />
          <ContentBox />
        </div>
        <MailWrite />
      </ContentContainer>
    </HomeConrainer>
  );
};
export default Home;

const HomeConrainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentContainer = styled.section`
  margin: 7rem auto 4rem;
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .content_selected_container {
    display: flex;
    gap: 25px;
  }
`;
