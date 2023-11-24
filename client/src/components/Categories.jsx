import React from "react";
import { styled } from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://img.freepik.com/premium-vector/set-hand-drawn-online-shopping-doodle_563464-55.jpg");
  background-position: center;
  opacity: 0.5;
  z-index: -1;
`;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative; /* Ensure z-index works */
  z-index: 1; /* Bring content above the background image */
`;

const Categories = () => {
  return (
    <PageContainer>
      <BackgroundImage />
      <Container>
        {categories.map((item, index) => (
          <CategoryItem key={index} item={item} />
        ))}
      </Container>
    </PageContainer>
  );
};

export default Categories;
