import styled from "@emotion/styled";
import React from "react";
import { Helmet } from "react-helmet";
import GlobalStyle from "./GlobalStyle";
import Footer from "./Footer";

interface ITemplate {
  title: string;
  description: string;
  url: string;
  image: string;
  children: React.ReactNode;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template: React.FC<ITemplate> = (props) => {
  const { title, description, url, image, children } = props;

  return (
    <Container>
      <Helmet>
        <title>Hyun's Dev Blog</title>

        <meta
          name="description"
          content="항상 발전하기 위해 노력하는 주니어 개발자입니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@isdebrave" />
        <meta name="twitter:creator" content="@isdebrave" />
        <html lang="ko" />
      </Helmet>

      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;
