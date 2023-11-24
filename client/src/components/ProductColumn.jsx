import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { Favorite, ShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductWrapper = styled.div`
  display: grid;
  width: 80%;
  margin: 0 auto;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  grid-template-rows: auto;
`;

const ProductCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  text-align: center;
  margin: 10px;
  transition: transform 0.3s ease-in-out;
  height: 300px;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  transition: filter 0.3s ease-in-out;
`;

const HoverIcons = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
`;

const Icon = styled.div`
  font-size: 24px;
  margin: 10px;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff4081;
  }
`;

const ProductCardWithHover = styled(ProductCard)`
  &:hover {
    transform: translateY(-5px) scale(1.05);
  }

  &:hover ${ProductImage} {
    filter: blur(5px);
  }

  &:hover ${HoverIcons} {
    display: flex;
  }
`;

const ProductName = styled.h2`
  margin-bottom: 10px;
  font-size: 21px;
`;

const ProductPrice = styled.p`
  color: green;
  font-weight: bold;
`;

const PLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const sortProducts = (products, sortOption) => {
  // Sort products based on the selected option
  if (sortOption === "asc") {
    return products.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption === "desc") {
    return products.slice().sort((a, b) => b.price - a.price);
  } else {
    // Default: Newest
    return products;
  }
};
const ProductColumn = ({ category, sort }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const apiUrl = category
          ? `http://localhost:5000/api/products?category=${category}`
          : "http://localhost:5000/api/products";

        const res = await axios.get(apiUrl);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, [category]);

  // Sort the products based on the selected option
  const sortedProducts = sortProducts(products, sort);

  return (
    <ProductWrapper>
      {sortedProducts.map((product) => (
        <PLink to={`/product/${product._id}`}>
          <ProductCardWithHover>
            <ProductImage src={product.img} alt={product.title} />
            <HoverIcons>
              <Icon>
                <Favorite />
              </Icon>
              <Icon>
                <ShoppingCart />
              </Icon>
              <Icon>
                <Search />
              </Icon>
            </HoverIcons>
            <ProductName>{product.title}</ProductName>
            <ProductPrice>₹{product.price}</ProductPrice>
          </ProductCardWithHover>
        </PLink>
      ))}
    </ProductWrapper>
  );
};

export default ProductColumn;
