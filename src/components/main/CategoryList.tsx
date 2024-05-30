import styled from "@emotion/styled";
import { GatsbyLinkProps, Link } from "gatsby";
import React from "react";

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`;

/* GatsbyLinkProps로부터 추출 */
/* type */
// type CategoryItemLinkType = GatsbyLinkProps<string> & { active: boolean };

/* interface */
// interface ICategoryItemLink extends GatsbyLinkProps<string> {
//   active: boolean;
// }

type CategoryItemLink = {
  children: React.ReactNode;
  to: string;
} & { active: boolean };

const CategoryItem = styled(Link)<CategoryItemLink>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${(props: CategoryItemLink) => (props.active ? "800" : "400")};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export interface ICategoryList {
  selectedCategory: string;
  categoryList: {
    [key: string]: number;
  };
}

const CategoryList: React.FC<ICategoryList> = (props) => {
  const { selectedCategory, categoryList } = props;

  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          key={name}
          to={`/?category=${name}`}
          active={name === selectedCategory}
        >
          #{name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
