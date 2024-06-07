import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PostListItemType } from "types/PostItem.types";

export type useInfiniteScrollType = {
  containerRef: React.RefObject<HTMLDivElement>;
  postList: PostListItemType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = (
  selectedCategory: string,
  posts: PostListItemType[]
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> = useRef(null);
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<PostListItemType[]>(() => {
    return posts.filter((post) => {
      const { categories } = post.node.frontmatter;

      return selectedCategory === "All"
        ? true
        : categories.includes(selectedCategory);
    });
  }, [selectedCategory]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount((value) => value + 1);
      observer.unobserve(entries[0].target);
    });
  }, []);

  useEffect(() => setCount(1), [selectedCategory]);

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0 ||
      observer.current === null
    ) {
      return;
    }

    observer.current.observe(
      containerRef.current.children[containerRef.current.children.length - 1]
    );
  }, [count, selectedCategory]);

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
