import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import ProductColumn from "../components/ProductColumn";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const Container = styled.div``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 80px;
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 15px;
`;

const Option = styled.option``;

const CenteredTitle = styled.h1`
  text-align: center;
`;

const ProductPage = () => {
  const { category } = useParams();
  const [categoryFromDB] = useState("");
  const navigate = useNavigate();
  const [setProducts] = useState([]);
  const [sort, setSort] = useState("new");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    // Redirect to the correct URL if the category in the URL doesn't match the category from the backend
    if (categoryFromDB && category !== categoryFromDB) {
      navigate(`/products/${categoryFromDB}`);
    }
  }, [category, categoryFromDB, navigate]);

  return (
    <Container>
      <Navbar />
      <Banner />
      <br />
      <CenteredTitle>All {category}</CenteredTitle>
      <br />

      <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="new">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <ProductColumn category={category} sort={sort} />
    </Container>
  );
};

export default ProductPage;
