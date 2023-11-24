import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const MainContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-top: 60px;
`;

const TeamInfo = styled.div`
  margin-top: 20px;
  font-size: 18px;
  margin-bottom: 5px;
`;

const About = () => {
  return (
    <MainContainer>
      <Navbar />
      <Banner />
      <Container>
        <div>Team no: 428</div>
        <TeamInfo>
          <div>Members:</div>
          <ul>
            <li>Gangi Rakshith Raj</li>
            <li>Dipti Mahakalkar</li>
            <li>Sarath Rajendran</li>
            <li>Aniket Sharma</li>
            <li>Aswin P Kumar</li>
          </ul>
          <p>
            We are students of VIT Bhopal, pursuing Computer Science and
            Engineering.
          </p>
          <p>
            This website is created as a part of the Ethnus MERN Full Stack
            Internship.
          </p>
        </TeamInfo>
      </Container>
    </MainContainer>
  );
};

export default About;
