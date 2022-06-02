import styled from "@emotion/styled";
import React, { FC } from "react";

type Props = {
  title: string;
  subTitle: string;
};

const Title: FC<Props> = ({ title, subTitle }) => {
  return (
    <TitleBox>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </TitleBox>
  );
};

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  & p {
    margin-top: 5px;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
`;

export default Title;
