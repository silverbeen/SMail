import Link from "next/link";
import styled from "@emotion/styled";
import {useRouter} from "next/router";
import {blueColor, mainColor} from "../../styles/color";
import axios from "axios";
import {useQuery} from "react-query";
import {MAIN_URL} from "../../service/common";
import {FC} from "react";
import {
  useGetCategory,
  CategoryResponseDto,
} from "../../service/query-hooks/category";

const CategoryList: FC = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const {data: categoryData} = useGetCategory();

  return (
    <CategoryListContainer>
      {categoryData?.map((category: CategoryResponseDto, index: number) => (
        <CategoryItems key={index}>
          <h3>{category.title}</h3>
          {category.list.map((item) => (
            <li
              key={item.fieldId}
              style={{
                color: item.fieldId === id ? `${mainColor}` : "",
                fontWeight: item.fieldId === id ? 500 : "",
              }}
            >
              <Link href={`categoryTab=${item.fieldId}`}>{item.fieldName}</Link>
            </li>
          ))}
        </CategoryItems>
      ))}
    </CategoryListContainer>
  );
};

export const CategoryListContainer = styled.nav`
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
  margin-bottom: 25px;

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
