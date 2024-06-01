import styled from "@emotion/styled";
import Footer from "components/common/Footer";
import GlobalStyle from "components/common/GlobalStyle";
import CategoryList, { ICategoryList } from "components/main/CategoryList";
import Introduction from "components/main/Introduction";
import PostList from "components/main/PostList";
import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { PostListItemType } from "types/PostItem.types";

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

interface IIndexPage {
  location: {
    search: string;
  };
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}

const IndexPage: React.FC<IIndexPage> = (props) => {
  const { search } = props.location;
  const { edges } = props.data.allMarkdownRemark;
  const { gatsbyImageData } = props.data.file.childImageSharp;
  const [categoryList, setCategoryList] = useState<
    ICategoryList["categoryList"]
  >({});

  const parsed = queryString.parse(search);
  const selectedCategory =
    typeof parsed.category !== "string" || !parsed.category
      ? "All"
      : parsed.category;

  useEffect(() => {
    const list: ICategoryList["categoryList"] = { All: 0 };

    for (const edge of edges) {
      const categories = edge.node.frontmatter.categories;

      categories.forEach((category) => {
        if (!list[category]) {
          list[category] = 1;
        } else {
          list[category]++;
        }
      });

      list["All"]++;
    }

    setCategoryList(list);
  }, []);

  return (
    <Container>
      <GlobalStyle />
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
      <Footer />
    </Container>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`;
