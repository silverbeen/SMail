import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { blueColor } from "../../styles/color";
import axios from "axios";
import { useQuery } from "react-query";
import { CategoryListType } from "../../lib/types/Category";
import { MAIN_URL } from "../../lib/api/common";

const CategoryList = () => {
  const router = useRouter();

  const { data: categoryData } = useQuery(
    ["categoryList"],
    () => axios(`${MAIN_URL}/category`),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true,
    }
  );

  return (
    <CategoryListContainer>
      {categoryData?.data.map((categorys: CategoryListType, index: number) => (
        <CategoryItems key={index}>
          <h3>{categorys.title}</h3>
          {categorys.list.map((field) => (
            <li key={field.fieldId}>
              <Link href={`?id=${field.fieldId}`}>{field.fieldName}</Link>
            </li>
          ))}
        </CategoryItems>
      ))}
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
