import styled from "styled-components";
import React from "react";

const Container = styled.div`
  height: 30px;
  padding: 5px;
  background: rgb(0, 0, 0);
  background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(156, 153, 148, 1) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

const Banner = () => {
  return <Container>Now or Never! Free Shipping for new Customers</Container>;
};

export default Banner;
