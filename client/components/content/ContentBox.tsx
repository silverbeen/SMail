import {FC} from "react";
import styled from "@emotion/styled";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {useRecoilState} from "recoil";

import {contentMenuAtom} from "../../lib/module/atom/content";
import {blueColor, grayBorderColor, mainColor} from "../../styles/color";
import {menuData} from "../../contexts/menuData";
import ContentItemBox from "./ContentItemBox";
import {
  ContentResponseDto,
  useGetContents,
} from "../../service/query-hooks/content";
import {useGetDesk} from "../../service/query-hooks/desk";
import {useGetTemplate} from "../../service/query-hooks/template";

const ContentBox: FC = () => {
  const router = useRouter();
  const contentId = Number(router.query.id);
  const [optionMenu, setSelected] = useRecoilState(contentMenuAtom);

  const menuClickHandle = (id: number) => {
    setSelected(id);
  };

  const {data: contentData} = useGetContents(contentId);
  const {data: deskData} = useGetDesk();
  const {data: templateData} = useGetTemplate();

  const renderData = () => {
    switch (optionMenu) {
      case 1:
        return contentData && contentData;
      case 2:
        return deskData && deskData.deskContent;
      case 3:
        return templateData && templateData;
      default:
        return [];
    }
  };

  return (
    <ContentBoxContainer>
      <ContentWrapper>
        <MenuContainer>
          {menuData.map((menu) => (
            <span
              key={menu.id}
              onClick={() => menuClickHandle(menu.id)}
              style={{
                color: menu.id === optionMenu ? `${mainColor}` : "",
                fontWeight: menu.id === optionMenu ? 500 : "",
              }}
            >
              {menu.menu}
            </span>
          ))}
        </MenuContainer>
        <ContentItemList>
          {contentData && contentData.length > 0 ? (
            <>
              {renderData()?.map((item: any, idx: number) => (
                <article key={idx}>
                  {item.title && <TemplateTitle>{item.title}</TemplateTitle>}
                  <ContentItemBox
                    contentData={contentData}
                    content={item}
                    option={optionMenu}
                  />
                </article>
              ))}
            </>
          ) : (
            <>등록된 문구가 없습니다.</>
          )}
        </ContentItemList>
      </ContentWrapper>
    </ContentBoxContainer>
  );
};

const TemplateTitle = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
  color: #6f828c;
`;

const ContentItemList = styled.div`
  padding: 30px;
  height: 85%;
  max-height: 66vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContentBoxContainer = styled.section`
  width: 500px;
  min-width: 450px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
`;

const MenuContainer = styled.header`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  padding: 15px 30px;
  box-sizing: border-box;
  border-bottom: 1px solid ${grayBorderColor};

  & span {
    cursor: pointer;
    font-size: 14px;
    color: ${blueColor};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ContentBox;
