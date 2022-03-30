import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { ToastSuccess } from "../../../lib/function/toast";
import { MailInputAtom } from "../../../lib/module/atom/mail";
import { ContentType, DeskContentType } from "../../../lib/types/ContentTypes";
import { blueColor, mintBlueColor, mintColor } from "../../../styles/color";
import { useMutation, useQueryClient } from "react-query";
import desk from "../../../lib/api/desk";
import { isSaveAtom } from "../../../lib/module/atom/content";

type Props = {
  contentData: ContentType[] | any;
  content: ContentType;
};

const ContentItemBox = ({ content, contentData }: Props) => {
  const queryClient = useQueryClient();
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);
  const [isSave, setIsSave] = useRecoilState(isSaveAtom);

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

  const contentSaveHandle = () => {
    isSave ? contentDeskSave(content.contentId) : contentDeskDelete(content.id);
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
        <span onClick={contentSaveHandle}>Saved</span>
      </div>
    </ContentItemBoxWrapper>
  );
};

const ContentItemBoxWrapper = styled.div`
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

export default ContentItemBox;
