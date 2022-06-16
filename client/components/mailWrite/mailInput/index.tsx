import styled from "@emotion/styled";
import {
  blueColor,
  grayBorderColor,
  grayTextColor,
} from "../../../styles/color";
import TextareaAutosize from "react-textarea-autosize";
import IconBox from "./IconBox";
import { useRecoilState } from "recoil";
import { MailInputAtom } from "../../../lib/module/atom/mail";
import { useMutation, useQuery } from "react-query";
import mail from "../../../lib/api/mail";
import { FC, useEffect, useRef } from "react";
import { ToastError, ToastSuccess } from "../../../lib/function/toast";

type Props = {
  modalOpenHandle?: () => void;
};

const MailInput: FC<Props> = ({ modalOpenHandle }) => {
  const contentRef = useRef(null);
  const [mailValue, setMailValue] = useRecoilState(MailInputAtom);

  const mailSaveHandle = () => {
    saveMailMutate();
  };

  const mailCopyHandle = () => {
    const el: any = contentRef.current;
    el.select();
    document.execCommand("copy");

    ToastSuccess("클립보드에 복사되었습니다.");
  };

  const inputChangeHandle = (e: any) => {
    const { name, value } = e.target;

    setMailValue({
      ...mailValue,
      [name]: value,
    });
  };

  const { data: mailData } = useQuery("mailData", () => mail.getMail(), {
    cacheTime: Infinity,
    refetchInterval: 1000 * 60 * 5,

    onSuccess: () => {
      ToastSuccess("저장된 메일을 불러왔습니다.");
    },
    onError: () => {
      ToastError("저장된 메일을 불러오기에 실패했습니다.");
    },
  });

  const { mutate: saveMailMutate } = useMutation(
    "saveMail",
    () => mail.postMail(mailValue),
    {
      onSuccess: () => {
        ToastSuccess("메일을 저장했습니다.");
      },
      onError: () => {
        ToastError("다시 시도해주세요");
      },
    }
  );

  useEffect(() => {
    setMailValue({
      title: mailData?.data.mailTitle,
      content: mailData?.data.mailContent,
    });
  }, [mailData]);

  return (
    <MailInputContainer>
      <TitleWrapper>
        <span>제목</span>
        <input
          type="text"
          placeholder="제목은 본문 내용을 표현할 수 있게 작성해주세요."
          defaultValue={mailValue.title}
          name="title"
          onChange={(e) => inputChangeHandle(e)}
        />
      </TitleWrapper>
      <ContentWrapper>
        <TextareaAutosize
          ref={contentRef}
          placeholder="메일 첫 문장은 인사말과 자신을 밝히세요!"
          value={mailValue.content}
          name="content"
          onChange={(e) => inputChangeHandle(e)}
        ></TextareaAutosize>
        <footer className="btn_container">
          <div className="icon_container">
            <IconBox icon="Copy" mailCopyHandle={mailCopyHandle} />
            <IconBox icon="Save" mailSaveHandle={mailSaveHandle} />
          </div>
          <IconBox icon="Plus" templateModalOpen={modalOpenHandle} />
        </footer>
      </ContentWrapper>
    </MailInputContainer>
  );
};

const MailInputContainer = styled.section`
  margin-top: 60px;
  width: 100%;
  height: 500px;
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
`;

const TitleWrapper = styled.header`
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
