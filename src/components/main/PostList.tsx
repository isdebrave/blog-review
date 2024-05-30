import styled from "@emotion/styled";
import PostItem from "./PostItem";
import { PostListItemType } from "types/PostItem.types";
import { useMemo } from "react";

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`;

interface IPostList {
  selectedCategory: string;
  posts: PostListItemType[];
}

const PostList: React.FC<IPostList> = ({ selectedCategory, posts }) => {
  const selectedPostList = useMemo<PostListItemType[]>(() => {
    return posts.filter((post) => {
      const { categories } = post.node.frontmatter;

      return selectedCategory === "All"
        ? true
        : categories.includes(selectedCategory);
    });
  }, [selectedCategory]);

  return (
    <PostListWrapper>
      {selectedPostList.map((post) => (
        <PostItem
          key={post.node.id}
          {...post.node.frontmatter}
          link="https://www.google.co.kr/"
        />
      ))}
    </PostListWrapper>
  );
};

export default PostList;
