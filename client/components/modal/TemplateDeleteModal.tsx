import styled from "@emotion/styled";
import {FC} from "react";
import {useMutation, useQueryClient} from "react-query";
import {ToastSuccess} from "../../lib/function/toast";
import {mainColor, redColor} from "../../styles/color";
import {useDeleteDesk} from "../../service/query-hooks/desk";

type Props = {
  openModal: boolean;
  setModalOpen: (openModal: boolean) => void;
  templateId: number;
};

const TemplateDeleteModal: FC<Props> = ({
  openModal,
  setModalOpen,
  templateId,
}) => {
  const modalCloseHandle = () => {
    setModalOpen(false);
  };

  // 템플릿 삭제
  const {mutate: templateDelete} = useDeleteDesk();

  const handleClickDeleteBtn = () => {
    templateDelete(templateId, {onSuccess: () => modalCloseHandle()});
  };
  return (
    <ModalContainer openModal={openModal}>
      <p>나의 템플릿을 삭제하시겠습니까?</p>
      <ControlBox>
        <button onClick={modalCloseHandle}>취소</button>
        <button onClick={handleClickDeleteBtn}>삭제</button>
      </ControlBox>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{openModal: boolean}>`
  background: #ffffff;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
  display: ${({openModal}) => (openModal ? "flex" : "none")};
  flex-direction: column;
`;

export const ControlBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & button {
    border: none;
    background: none;
    font-size: 16px;
  }

  & button:nth-of-type(1) {
    color: ${redColor};
  }

  & button:nth-of-type(2) {
    color: ${mainColor};
  }
`;

export default TemplateDeleteModal;
