import Template from "components/common/Template";
import CategoryList, { ICategoryList } from "components/main/CategoryList";
import Introduction from "components/main/Introduction";
import PostList from "components/main/PostList";
import { graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { PostListItemType } from "types/PostItem.types";

interface IIndexPage {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
      publicURL: string;
    };
  };
}

const IndexPage: React.FC<IIndexPage> = (props) => {
  const { search } = props.location;
  const { title, description, siteUrl } = props.data.site.siteMetadata;
  const { edges } = props.data.allMarkdownRemark;
  const {
    childImageSharp: { gatsbyImageData },
    publicURL,
  } = props.data.file;

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
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Template>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
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
