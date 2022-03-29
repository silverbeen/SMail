import styled from "@emotion/styled";
import { mintBlueColor } from "../../../styles/color";

type Props = {
  icon: "Copy" | "Save" | "Plus";
  templateModalOpen?: any;
  mailSaveHandle?: any;
};

const IconBox = ({ icon, templateModalOpen, mailSaveHandle }: Props) => {
  const IconNameChangeHandle = (icon: "Copy" | "Save" | "Plus") => {
    if (icon == "Copy") return "Copy";
    else if (icon == "Save") return "Save";
    else return "템플릿 추가하기";
  };

  const iconClickHandle = () => {
    if (icon == "Copy") return;
    else if (icon == "Save") mailSaveHandle();
    else return templateModalOpen();
  };

  return (
    <IconBoxContainer onClick={iconClickHandle}>
      <img src={`/assets/icon/${icon}Icon.svg`} alt={`${icon} 아이콘`} />
      <span>{IconNameChangeHandle(icon)}</span>
    </IconBoxContainer>
  );
};

const IconBoxContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 6px;
  color: ${mintBlueColor};
  font-size: 12px;
  font-weight: 700;

  & img {
    width: 15px;
  }
`;

export default IconBox;
