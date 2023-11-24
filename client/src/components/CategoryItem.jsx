import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { categories } from "../data";

const Container = styled.div`
  text-align: center;
  flex: 1;
  margin: 10px auto; /* Adjust margin to add padding and center horizontally */
  height: 40vh; /* Set a reduced height */
  width: calc(
    33.33%
  ); /* Set width to one-third of the container with padding */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  border-radius: 10px; /* Add border-radius for rounded corners */

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  object-fit: cover; /* Maintain aspect ratio and cover the entire space */
  border-radius: 10px; /* Match the border-radius of the container */
`;

const Info = styled.div`
  text-align: center;
  color: white;
  position: absolute;
  z-index: 1;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 15px;
  font-size: 40px; /* Reduce font size */
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  padding: 7px;
  background-color: white;
  color: grey;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #d3d3d3;
    color: black;
  }
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    if (item.title === "LAPTOPS") {
      navigate("/laptops");
    }

    if (item.title === "MOBILE PHONES") {
      navigate("/mobiles");
    }

    if (item.title === "WEARABLES") {
      navigate("/wearables");
    }
  };

  return (
    <Container>
      <Link
        to={`/products/${categories
          .find((category) => category.title === item.title)
          .title.toLowerCase()}`}
      >
        <ImageContainer>
          <Image src={item.img} alt={item.title} />
          <Info>
            <Title>{item.title}</Title>
            <Button onClick={handleShopNowClick}>SHOP NOW</Button>
          </Info>
        </ImageContainer>
      </Link>
    </Container>
  );
};

export default CategoryItem;
