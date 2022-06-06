import { FC } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToastSuccess } from "../../../lib/function/toast";
import { MailInputAtom } from "../../../lib/module/atom/mail";
import { ContentType } from "../../../@types/ContentTypes";
import {
  blueColor,
  mainColor,
  mintBlueColor,
  mintColor,
} from "../../../styles/color";
import { useMutation, useQueryClient } from "react-query";
import desk from "../../../lib/api/desk";
import template from "../../../lib/api/template";
import { contentMenuAtom } from "../../../lib/module/atom/content";
import { OptionStateIcon } from "../../../lib/function/optionState";
import CopyIcon from "../../../public/assets/icon/CopyIcon.svg";

type Props = {
  contentData: ContentType[] | any;
  content: ContentType;
  option: number;
};

const ContentItemBox: FC<Props> = ({ content, contentData, option }) => {
  const queryClient = useQueryClient();
  const contentMenu = useRecoilValue(contentMenuAtom);
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);

  // 내 서랍 문구 추가
  const { mutate: contentDeskSave } = useMutation(
    "cotentSave",
    (id: number) => desk.postDesk(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("deskData");
        queryClient.invalidateQueries("contentData");
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
        queryClient.invalidateQueries("contentData");
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
        return content.saved ? null : contentDeskSave(content.contentId);
      case 2:
        return content.saved ? null : contentDeskDelete(content.id);
      case 3:
        return templateDelete(id);
    }
  };

  const addIconClickHandle = (content: string) => {
    setMailValue({
      ...mailValue,
      content: mailValue.content + "\n" + content,
    });

    ToastSuccess("✏️문구가 추가되었습니다.");
  };

  return (
    <ContentItemBoxWrapper key={content.contentId}>
      <pre>{content.content}</pre>
      <div className="item_box">
        {/* <img
          src="/assets/icon/CopyIcon.svg"
          alt=""
          onClick={() => addIconClickHandle(content.content)}
        /> */}
        <CopyIcon />
        <img
          src={`assets/icon/${OptionStateIcon(option, content.saved)}Icon.svg`}
          onClick={() => contentSaveHandle(content.id)}
        />
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
    width: 20%;
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

    svg {
      fill: ${mintBlueColor};
      transition: all 0.3s;

      :hover {
        fill: ${mainColor};
      }
    }

    > img {
      width: 15px;
      cursor: pointer;
      transition: all 0.3s;

      :hover img {
        fill: rgba(85, 125, 242, 0.6);
      }
    }
  }
`;

export default ContentItemBox;
