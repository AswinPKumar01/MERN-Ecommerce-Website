import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const MainContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  text-align: center;
  font-weight: bold;
  font-color: black;
  font-size: 30px;
  margin-top: 60px;
`;
const About = () => {
  return (
    <MainContainer>
      <Navbar />
      <Banner />
      <Container>THIS IS THE ABOUT PAGE</Container>
    </MainContainer>
  );
};

export default About;
