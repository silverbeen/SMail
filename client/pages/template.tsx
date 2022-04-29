import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useState } from "react";
import CategoryList from "../components/category";
import ContentBox from "../components/content/contentBox/ContentBox";
import Header from "../components/header";
import MailInput from "../components/mailWrite/mailInput";
import Title from "../components/mailWrite/title";
import TemplateModal from "../components/modal/TemplateCreateModal";

const Template: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const modalOpenHandle = () => {
    setModalOpen(true);
  };

  return (
    <HomeConrainer>
      <TemplateModal openModal={modalOpen} setModalOpen={setModalOpen} />
      <Header />
      <ContentContainer>
        <div className="content_selected_container">
          <CategoryList />
          <ContentBox />
        </div>
        <MailContainer>
          <Title
            title="템플릿 제작"
            subTitle="자주 사용하는 글을 템플릿으로 만들어보세요!"
          />
          <MailInput modalOpenHandle={modalOpenHandle} />
        </MailContainer>
      </ContentContainer>
    </HomeConrainer>
  );
};
export default Template;

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

const MailContainer = styled.div`
  width: 400px;
  height: 100%;
`;
