import {FC} from "react";
import styled from "@emotion/styled";
import {useRecoilState, useRecoilValue} from "recoil";

import {ToastSuccess} from "../../lib/function/toast";
import {MailInputAtom} from "../../lib/module/atom/mail";
import {
  blueColor,
  mainColor,
  mintBlueColor,
  mintColor,
} from "../../styles/color";
import {contentMenuAtom} from "../../lib/module/atom/content";
import {OptionStateIcon} from "../../lib/function/optionState";
import CopyIcon from "../../public/assets/icon/CopyIcon.svg";
import {useDeleteDesk, usePostDesk} from "../../service/query-hooks/desk";
import {ContentResponseDto} from "../../service/query-hooks/content";
import {useDeleteTemplate} from "../../service/query-hooks/template";

type Props = {
  contentData: ContentResponseDto[] | any;
  content: ContentResponseDto;
  option: number;
};

const ContentItemBox: FC<Props> = ({content, contentData, option}) => {
  const contentMenu = useRecoilValue(contentMenuAtom);
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);

  const {mutate: postDesk} = usePostDesk();
  const {mutate: deleteDesk} = useDeleteDesk();
  const {mutate: deleteTemplate} = useDeleteTemplate();

  const contentSaveHandle = (id: number) => {
    switch (option) {
      case 1:
        return content.saved ? null : postDesk(content.contentId);
      case 2:
        return content.saved ? null : deleteDesk(content.id);
      case 3:
        return deleteTemplate(id);
    }
  };

  const addIconClickHandle = (content: string) => {
    setMailValue({
      ...mailValue,
      content: mailValue.content + "\n" + content,
    });

    ToastSuccess("✏️ 문구가 추가되었습니다.");
  };

  return (
    <ContentItemBoxWrapper key={content.contentId}>
      <pre>{content.content}</pre>
      <div className="item_box">
        <CopyIcon onClick={() => addIconClickHandle(content.content)} />
        <img
          src={`/assets/icon/${OptionStateIcon(option, content.saved)}Icon.svg`}
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
