import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { contentMenuAtom } from "../../lib/module/atom/content";
import { blueColor, grayBorderColor, mainColor } from "../../styles/color";
import { ContentType } from "../../@types/ContentTypes";
import { menuData } from "../../contexts/menuData";
import ContentItemBox from "./ContentItemBox";
import desk from "../../lib/api/desk";
import template from "../../lib/api/template";
import content from "../../lib/api/content";
import { FC } from "react";

const ContentBox: FC = () => {
  const router = useRouter();
  const [optionMenu, setSelected] = useRecoilState(contentMenuAtom);

  const menuClickHandle = (id: number) => {
    setSelected(id);
  };

  // 문구 데이터 가져오기
  const { data: contentData, isFetching } = useQuery(
    ["contentData", router.query.id],
    () => content.getContent(router.query.id),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!router.query.id,
    }
  );

  // 서랍 데이터 가져오기
  const { data: deskData } = useQuery(["deskData"], () => desk.getDesk(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // 템플릿 데이터 가져오기
  const { data: templateData } = useQuery(
    ["templateData"],
    () => template.getTemplate(),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  function menuReturn() {
    if (optionMenu === 1) {
      return contentData?.data;
    } else if (optionMenu === 2) {
      return deskData?.data.deskContent;
    } else return templateData?.data;
  }

  if (!isFetching) {
    console.log(contentData);
  }

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
          {contentData?.data === [] ? (
            <>등록된 문구가 없습니다.</>
          ) : (
            <>
              {menuReturn()?.map((item: ContentType, idx: number) => (
                <article key={idx}>
                  {item.title && <TemplateTitle>{item.title}</TemplateTitle>}
                  <ContentItemBox
                    contentData={contentData?.data}
                    content={item}
                    option={optionMenu}
                  />
                </article>
              ))}
            </>
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
