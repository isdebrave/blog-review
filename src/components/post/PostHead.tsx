import styled from "@emotion/styled";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import PostHeadInfo, { PostHeadInfoProps } from "./PostHeadInfo";

type GatsbyImgProps = {
  image: IGatsbyImageData;
  alt: string;
  className?: string;
};

type PostHeadProps = PostHeadInfoProps & {
  thumbnail: IGatsbyImageData;
};

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const BackgroundImage = styled(GatsbyImage)`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
`;

const PostHead: React.FC<PostHeadProps> = (props) => {
  const { title, date, categories, thumbnail } = props;

  return (
    <PostHeadWrapper>
      <BackgroundImage image={thumbnail} alt="thumbnail" />
      <PostHeadInfo title={title} date={date} categories={categories} />
    </PostHeadWrapper>
  );
};

export default PostHead;
