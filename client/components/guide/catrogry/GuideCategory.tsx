import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";

const categorys = [
  "메일 예절",
  "답장률 높이는 제안",
  "공고 메일",
  "비지니스 메일",
  "섭외 메일",
];

type Props = {
  setSelectCategory: any;
};

const GuideCategory: FC<Props> = ({ setSelectCategory }) => {
  const [idx, setIdx] = useState(0);
  const sec = 3;

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      setIdx(i + 1);
      i++;
    }, sec * 1000);
  }, []);

  return (
    <CategoryContainer>
      {categorys.map((_, index) => (
        <Text
          onClick={() => setSelectCategory(_)}
          style={
            idx % categorys.length === index
              ? {
                  fontSize: "24px",
                  fontWeight: 500,
                  color: "white",
                }
              : {}
          }
        >
          {_}
        </Text>
      ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.section`
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: white;
  row-gap: 20px;
  column-gap: 80px;
`;

const Text = styled.span`
  transition: 0.5s;
  cursor: pointer;
  line-height: 50px;
  color: #eef6fb;
  font-size: 18px;
`;

export default GuideCategory;
