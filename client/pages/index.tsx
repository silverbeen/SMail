import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useState } from "react";
import CategoryList from "../components/category";
import ContentBox from "../components/content/contentBox/ContentBox";
import Header from "../components/header";
import MailInput from "../components/mailWrite/mailInput";
import Title from "../components/mailWrite/title";
import TemplateCreateModal from "../components/modal/TemplateCreateModal";
import TemplateDeleteModal from "../components/modal/TemplateDeleteModal";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [temDelModalOpen, setTemDelModalOpen] = useState<boolean>(false);

  const modalOpenHandle = () => {
    setModalOpen(true);
  };

  return (
    <HomeConrainer>
      <TemplateDeleteModal
        openModal={temDelModalOpen}
        setModalOpen={setTemDelModalOpen}
        templateId={1}
      />
      <TemplateCreateModal openModal={modalOpen} setModalOpen={setModalOpen} />
      <Header />
      <ContentContainer>
        <div className="content_selected_container">
          <CategoryList />
          <ContentBox />
        </div>
        <MailContainer>
          <Title
            title="메일 작성"
            subTitle="다양한 추천 멘트로 메일을 빠르게 보내요!"
          />
          <MailInput modalOpenHandle={modalOpenHandle} />
        </MailContainer>
      </ContentContainer>
    </HomeConrainer>
  );
};

export const HomeConrainer = styled.div`
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

const MailContainer = styled.div`
  width: 400px;
  height: 100%;
`;

export default Home;
