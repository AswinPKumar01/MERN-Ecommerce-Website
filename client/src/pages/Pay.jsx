import React from "react";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const KEY =
  "pk_test_51OEykISEe8t9vYpZg5VXosDFnot5T6eLp2B4PpNUAahj8yaUHvEfNhfWF8nKvFK6DvEgqfvSMl00BW5RerG0lyFv00X1GtsGky";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for redirection

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 12300,
          }
        );
        console.log(res.data);

        // Redirect to /success after a successful payment
        navigate("/success");
      } catch (err) {
        console.log(err.response.data);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="E-Commerce"
        image="https://www.freeiconspng.com/thumbs/payment-icon/cash-payment-icon-5.png"
        billingAddress
        shippingAddress
        description="Your total is 1230"
        amount={123000}
        token={onToken}
        stripeKey={KEY}
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
