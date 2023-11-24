import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../redux/cartRedux"; // Update the path to your cart slice
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { resetCartTotal } from "../redux/cartRedux"; // Import the action creator

const KEY =
  "pk_test_51OEykISEe8t9vYpZg5VXosDFnot5T6eLp2B4PpNUAahj8yaUHvEfNhfWF8nKvFK6DvEgqfvSMl00BW5RerG0lyFv00X1GtsGky";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TopTexts = styled.div`
  font-size: 20px;
  font-weight: bold;
  ${mobile({ display: "none" })}

  &:hover {
    font-weight: bold;
  }
`;
const TopText = styled.span`
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  margin-bottom: 1px;
`;

const ProdPrice = styled.span`
  margin-bottom: 1px;
`;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const RButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: white;
  font-weight: 600;
  border: none;
`;

const RemoveIconContainer = styled.div`
  border: 0.5px solid grey;
  border-radius: 40%;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  margin-left: 60px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this line to get access to dispatch

  const onToken = (token) => {
    setStripeToken(token);
  };

  const totalQuantity = cart.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });

        if (res.status === 200) {
          // Use the data from the response as needed
          const { clientSecret } = res.data;

          // Example: Navigate to success page with additional data
          navigate("/success", { clientSecret, products: cart });
        } else {
          // Handle unsuccessful response, e.g., show an error message
          console.error("Payment failed:", res.data.error);
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    };
    stripeToken && cart.total > 1 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleRemoveProduct = (productId) => {
    // Dispatch the removeProduct action to remove the product from the cart
    dispatch(removeProduct(productId));
  };

  const handleResetTotal = () => {
    // Dispatch the action to reset the cart total
    dispatch(resetCartTotal());
  };
  return (
    <Container>
      <Navbar />
      <Banner />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/buy")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Total Quantity: {totalQuantity}</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProdPrice>
                      <b>Price:</b> {product.price}
                    </ProdPrice>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>Qty: {product.quantity}</ProductAmount>
                    <br />
                    <RemoveIconContainer
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      <DeleteOutlineIcon />
                    </RemoveIconContainer>
                  </ProductAmountContainer>
                  <ProductPrice>
                    Total: ₹ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 500</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice> - ₹ 500</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="QuinTech Ecom"
              image="https://www.freeiconspng.com/thumbs/payment-icon/cash-payment-icon-5.png"
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
            <RButton onClick={handleResetTotal}>RESET CART TOTAL</RButton>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
