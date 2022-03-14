import styled from "@emotion/styled";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ToastSuccess } from "../../../lib/function/toast";
import { MailInputAtom } from "../../../lib/module/atom/mail";
import {
  blueColor,
  grayBorderColor,
  mainColor,
  mintBlueColor,
  mintColor,
} from "../../../styles/color";

const contentData = [
  {
    contentId: 1,
    content: "은빈님, 안녕하세요! 대덕소프트웨어 마이스터고 학생 강은빈입니다.",
  },
  {
    contentId: 2,
    content: "다들 반가워여~~~~~",
  },
  {
    contentId: 3,
    content: "환영해요~!!~!~",
  },
];

const menuData = [
  { id: 1, menu: "문구" },
  { id: 2, menu: "서랍" },
  { id: 3, menu: "템플릿" },
];

const ContentBox = () => {
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);
  const [selected, setSelected] = useState<number>(1);

  const addIconClickHanle = (contentId: number) => {
    const textValue = contentData.find(
      (content) => contentId === content.contentId
    )?.content;

    setMailValue(mailValue + "\n" + textValue);
    // ToastSuccess("✏️문구가 추가되었습니다.");
  };

  const menuClickHandle = (id: number) => {
    setSelected(id);
  };

  return (
    <ContentBoxContainer>
      <MenuContainer>
        {menuData.map((menu) => (
          <span
            key={menu.id}
            onClick={() => menuClickHandle(menu.id)}
            style={{
              color: menu.id === selected ? `${mainColor}` : "",
              fontWeight: menu.id === selected ? 500 : "",
            }}
          >
            {menu.menu}
          </span>
        ))}
      </MenuContainer>
      <ContentWrapper>
        {contentData.map((content) => (
          <ContentItemBox key={content.contentId}>
            <pre>{content.content}</pre>
            <div className="item_box">
              <img
                src="/assets/icon/CopyIcon.svg"
                alt=""
                onClick={() => addIconClickHanle(content.contentId)}
              />
              <span>Saved</span>
            </div>
          </ContentItemBox>
        ))}
      </ContentWrapper>
    </ContentBoxContainer>
  );
};

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
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
`;

const ContentItemBox = styled.div`
  width: 90%;
  background: ${mintColor};
  box-shadow: 0px 1px 12px rgba(200, 200, 200, 0.25);
  border-radius: 10px;
  padding: 14px 18px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  & pre {
    color: ${blueColor};
    font-size: 14px;
    font-weight: 400;
    white-space: pre-wrap;
  }

  .item_box {
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    > span {
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      color: ${mintBlueColor};
    }

    > img {
      height: 16px;
      cursor: pointer;
    }
  }
`;

export default ContentBox;
