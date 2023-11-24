import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom"; // Import useParams from react-router-dom
import { publicRequest } from "../requestMethods";
import { Add, Remove } from "@mui/icons-material";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";

const MainContainer = styled.div``;

const Container = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
`;

const ImgContainer = styled.div`
  border: 1px solid grey;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const ProdTitle = styled.h1`
  font-weight: 200;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const AddCont = styled.div`
  margin-top: 20px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmtCont = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amt = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Btn = styled.button`
  padding: 10px;
  border: 2px solid grey;
  barder-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-left: 20px;

  &:hover {
    background-color: #f8f4f4;
  }
`;
const Product = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/");
  console.log(pathArray);
  const id = pathArray[pathArray.length - 1];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Location Pathname:", location.pathname);
    const pathArray = location.pathname.split("/");
    console.log("Path Array:", pathArray);
    const id = pathArray[pathArray.length - 1];

    const getProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const res = await publicRequest.get(`/products/find/${id}`);
        console.log("Product Data:", res.data);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [location.pathname]);

  if (!product || !product._id) {
    return <div>Product not found</div>;
  }

  const handleQuantity = (type) => {
    if (type == "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <MainContainer>
      <Navbar />
      <Banner />
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} alt={product.title} />
          </ImgContainer>

          <InfoContainer>
            <ProdTitle>{product.title}</ProdTitle>
            <Price>₹ {product.price}</Price>
            <Desc>{product.desc}</Desc>

            <AddCont>
              <AmtCont>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amt>{quantity}</Amt>
                <Add onClick={() => handleQuantity("inc")} />
              </AmtCont>

              <Btn onClick={handleClick}>Add to Cart</Btn>
            </AddCont>
          </InfoContainer>
        </Wrapper>
      </Container>
    </MainContainer>
  );
};

export default Product;
