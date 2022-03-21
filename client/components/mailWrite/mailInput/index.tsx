import styled from "@emotion/styled";
import {
  blueColor,
  grayBorderColor,
  grayTextColor,
} from "../../../styles/color";
import TextareaAutosize from "react-textarea-autosize";
import IconBox from "./IconBox";
import { useRecoilValue } from "recoil";
import { MailInputAtom } from "../../../lib/module/atom/mail";

type Props = {
  modalOpenHandle?: () => void;
};

const MailInput = ({ modalOpenHandle }: Props) => {
  const mailValue = useRecoilValue(MailInputAtom);

  return (
    <MailInputContainer>
      <TitleWrapper>
        <span>제목</span>
        <input
          type="text"
          placeholder="제목은 본문 내용을 표현할 수 있게 작성해주세요."
        />
      </TitleWrapper>
      <ContentWrapper>
        <TextareaAutosize
          placeholder="메일 첫 문장은 인사말과 자신을 밝히세요!"
          defaultValue={mailValue}
        ></TextareaAutosize>
        <div className="btn_container">
          <div className="icon_container">
            <IconBox icon="Copy" />
            <IconBox icon="Save" />
          </div>
          <IconBox icon="Plus" templateModalOpen={modalOpenHandle} />
        </div>
      </ContentWrapper>
    </MailInputContainer>
  );
};

const MailInputContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 500px;
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
`;

const TitleWrapper = styled.div`
  padding: 25px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 25px;
  border-bottom: 1px solid ${grayBorderColor};

  & span {
    font-size: 14px;
    color: ${blueColor};
  }
  & input {
    width: 80%;
    border: none;
    color: ${blueColor};

    ::placeholder {
      color: ${grayTextColor};
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 30px;
  box-sizing: border-box;
  gap: 20px;
  width: 100%;
  height: 82%;

  & textarea {
    font-size: 14px;
    color: ${blueColor};
    border: none;
    resize: none;

    ::placeholder {
      color: ${grayTextColor};
    }
  }

  .btn_container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .icon_container {
      display: flex;
      flex-direction: row;
      gap: 30px;
    }
  }
`;

export default MailInput;
