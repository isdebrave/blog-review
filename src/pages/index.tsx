import styled from "@emotion/styled";
import Footer from "components/common/Footer";
import GlobalStyle from "components/common/GlobalStyle";
import CategoryList from "components/main/CategoryList";
import Introduction from "components/main/Introduction";

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

const IndexPage = () => {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <Footer />
    </Container>
  );
};

export default IndexPage;
