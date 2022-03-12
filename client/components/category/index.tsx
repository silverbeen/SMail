import styled from "@emotion/styled";
import { blueColor } from "../../styles/color";

const CategoryList = () => {
  return (
    <CategoryListContainer>
      <CategoryItems>
        <h3>인사말</h3>

        <li>날씨/인사 (63)</li>
        <li>날씨/인사 (63)</li>
        <li>날씨/인사 (63)</li>
      </CategoryItems>
    </CategoryListContainer>
  );
};

export const CategoryListContainer = styled.div`
  width: 240px;
  min-width: 240px;
  height: 100%;
  background: #ffffff;
  padding: 20px 25px;
  box-sizing: border-box;
  box-shadow: 0px 5px 25px rgba(103, 103, 103, 0.25);
  border-radius: 30px;
`;

const CategoryItems = styled.ul`
  display: flex;
  flex-direction: column;
  color: ${blueColor};

  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    margin-bottom: 10px;
  }

  li {
    font-weight: 400;
    font-size: 13px;
    line-height: 17px;
    margin-bottom: 5px;
    cursor: pointer;
  }
`;

export default CategoryList;
