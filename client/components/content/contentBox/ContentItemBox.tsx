import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { ToastSuccess } from "../../../lib/function/toast";
import { MailInputAtom } from "../../../lib/module/atom/mail";
import { ContentType } from "../../../@types/ContentTypes";
import { blueColor, mintBlueColor, mintColor } from "../../../styles/color";
import { useMutation, useQueryClient } from "react-query";
import desk from "../../../lib/api/desk";
import template from "../../../lib/api/template";
import { isSaveAtom } from "../../../lib/module/atom/content";
import { OptionStateIcon } from "../../../lib/function/optionState";

type Props = {
  contentData: ContentType[] | any;
  content: ContentType;
  option: number;
};

const ContentItemBox = ({ content, contentData, option }: Props) => {
  const queryClient = useQueryClient();
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);
  const [isSave, setIsSave] = useRecoilState(isSaveAtom);

  // 내 서랍 문구 추가
  const { mutate: contentDeskSave } = useMutation(
    "cotentSave",
    (id: number) => desk.postDesk(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("deskData");
        ToastSuccess("문구가 서랍에 저장되었습니다.");
      },
      onError: () => {
        ToastSuccess("문구가 서랍에 저장되었습니다.");
      },
    }
  );

  // 내 서랍 문구 삭제
  const { mutate: contentDeskDelete } = useMutation(
    "contentDelete",
    (id: number) => desk.deleteDesk(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("deskData");
        ToastSuccess("서랍에서 삭제 되었습니다.");
      },
      onError: () => {
        ToastSuccess("실패했습니다.");
      },
    }
  );

  // 템플릿 삭제
  const { mutate: templateDelete } = useMutation(
    "templateDelete",
    (id: number) => template.deleteDesk(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("templateData");
        ToastSuccess("템플릿이 삭제 되었습니다.");
      },
      onError: () => {
        ToastSuccess("실패했습니다.");
      },
    }
  );

  const contentSaveHandle = (id: number) => {
    switch (option) {
      case 1:
        return "content";
      case 2:
        return isSave
          ? contentDeskSave(content.contentId)
          : contentDeskDelete(content.id);

      case 3:
        return templateDelete(id);
    }
  };

  const addIconClickHandle = (contentId: number) => {
    const textValue = contentData?.find(
      (content: ContentType) => contentId === content.contentId
    )?.content;

    setMailValue({
      ...mailValue,
      content: mailValue.content + "\n" + textValue,
    });

    ToastSuccess("✏️문구가 추가되었습니다.");
  };

  useEffect(() => {
    setIsSave(false);
  }, []);

  return (
    <ContentItemBoxWrapper key={content.contentId}>
      <pre>{content.content}</pre>
      <div className="item_box">
        <img
          src="/assets/icon/CopyIcon.svg"
          alt=""
          onClick={() => addIconClickHandle(content.contentId)}
        />
        <span onClick={() => contentSaveHandle(content.id)}>
          {OptionStateIcon(option)}
        </span>
      </div>
    </ContentItemBoxWrapper>
  );
};

const ContentItemBoxWrapper = styled.div`
  width: 100%;
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

export default ContentItemBox;
