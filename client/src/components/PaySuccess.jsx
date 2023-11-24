import React from "react";
import styled from "styled-components";

const SuccessContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: green;
`;

const PaySuccess = () => {
  return (
    <SuccessContainer>
      <p>Payment Successful</p>
    </SuccessContainer>
  );
};

export default PaySuccess;
