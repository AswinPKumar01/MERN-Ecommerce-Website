import React from "react";
import Categories from "../components/Categories";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const Container = styled.div``;

const BuyPage = () => {
  return (
    <Container>
      <Navbar />
      <Banner />
      <Categories />
    </Container>
  );
};

export default BuyPage;
