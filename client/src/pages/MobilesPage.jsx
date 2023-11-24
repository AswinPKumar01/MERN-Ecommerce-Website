import React, { useEffect } from "react";
import ProductPage from "./ProductPage";
import { useNavigate } from "react-router-dom";

const MobilesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the /products/mobiles URL when the component mounts
    navigate("/products/mobiles");
  }, [navigate]);

  // Render the ProductPage component after the redirect
  return (
    <div>
      <h1>Redirecting to Mobiles Page...</h1>
      <ProductPage />
    </div>
  );
};

export default MobilesPage;
