import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { MAIN_URL } from "../../../lib/api/common";
import { contentMenuAtom } from "../../../lib/module/atom/content";
import { blueColor, grayBorderColor, mainColor } from "../../../styles/color";
import { ContentType } from "../../../lib/types/ContentTypes";
import ContentItemBox from "./ContentItemBox";
import desk from "../../../lib/api/desk";
import template from "../../../lib/api/template";

const menuData = [
  { id: 1, menu: "문구" },
  { id: 2, menu: "서랍" },
  { id: 3, menu: "템플릿" },
];

const ContentBox = () => {
  const router = useRouter();
  const [optionMenu, setSelected] = useRecoilState(contentMenuAtom);

  const menuClickHandle = (id: number) => {
    setSelected(id);
  };

  const { data: contentData } = useQuery(
    ["contentData", router.query.id],
    () => axios(`${MAIN_URL}/content?id=${router.query.id}`),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!router.query.id,
    }
  );

  const { data: deskData } = useQuery(["deskData"], () => desk.getDesk(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

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
          {menuReturn()?.map((item: ContentType) => (
            <ContentItemBox
              key={item.id}
              contentData={contentData?.data}
              content={item}
            />
          ))}
        </ContentItemList>
      </ContentWrapper>
    </ContentBoxContainer>
  );
};

const ContentItemList = styled.div`
  height: 85%;
  max-height: 66vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

const ContentBoxContainer = styled.article`
  width: 500px;
  min-width: 450px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
`;

const MenuContainer = styled.div`
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
  gap: 23px;
`;

export default ContentBox;
