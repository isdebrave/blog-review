import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import React from "react";

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }
`;

const TextStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`;

const Text1 = styled.div<{ disable: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${({ disable }) => (disable ? "line-through" : "none")};
`;

const Text2 = styled("div")<{ disable: boolean }>(({ disable }) => ({
  fontSize: "15px",
  color: "blue",
  textDecoration: disable ? "line-through" : "none",
}));

interface IInfoPage {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
  };
}

const InfoPage: React.FC<IInfoPage> = (props) => {
  const { title, description, siteUrl } = props.data.site.siteMetadata;

  return (
    <div>
      <Global styles={globalStyle} />
      <div css={TextStyle}>{title}</div>
      <Text1 disable>{description}</Text1>
      <Text2 disable={false}>{siteUrl}</Text2>
    </div>
  );
};

export default InfoPage;

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
