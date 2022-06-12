import styled from "@emotion/styled";
import { FC } from "react";
import { guideData } from "../../../contexts/guideData";

type Props = {
  selectCategory: string;
};

const GuideItem: FC<Props> = ({ selectCategory }) => {
  const guideFilterHandle = (catergory: string) => {
    return guideData.filter((data) => data.field.includes(catergory));
  };

  const titleFilterHandle = () => {
    switch (selectCategory) {
      case "메일 예절":
        return `[신입사원 가이드] 이메일 예절편`;
      case "비지니스 메일":
        return `[직장생활팁] 비즈니스 메일 가이드라인`;
      case "답장률 높이는 제안":
        return `[직장생활팁] 답장률 높이는 콜드메일 작성법`;
      case "공고 메일":
        return `[직장생활팁] "비즈니스 메일 가이드라인`;
      case "섭외 메일":
        return `[직장생활팁] "비즈니스 메일 가이드라인`;
    }
  };

  return (
    <GuideContainer>
      <h1>{titleFilterHandle()}</h1>
      {guideFilterHandle(selectCategory).map((item, idx) => (
        <GuideItemBox key={idx}>
          {item.title !== "" && (
            <h3>
              {idx + 1}. {item.title}
            </h3>
          )}
          {/* React 문자열 형태의 html태그 렌더링 하기 */}
          <pre dangerouslySetInnerHTML={{ __html: item.content }} />
        </GuideItemBox>
      ))}
    </GuideContainer>
  );
};

const GuideContainer = styled.section`
  width: 50%;
  padding: 30px;
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 50px;

  h3 {
    font-weight: 500;
  }
`;

const GuideItemBox = styled.div`
  & pre {
    white-space: pre-wrap;
    margin-top: 30px;
    font-weight: 300;
    & strong {
      font-weight: 400;
      background-color: rgb(166 255 250 / 62%);
    }

    & img {
      margin: 0 auto;
      width: 100%;
    }
  }
`;

export default GuideItem;
