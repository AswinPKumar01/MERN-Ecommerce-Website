import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const MainContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
  margin-bottom: 32px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CheckboxInput = styled.input`
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: black; /* Change background color to black */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Add transition for smooth effect */

  &:hover {
    transform: translateY(-3px); /* Add translation on Y-axis for 3D effect */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add box shadow for depth */
  }
`;
const ErrorContainer = styled.div`
  color: red;
  margin-top: 10px;
`;

const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 24px;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 5px;
`;

const ProductButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    desc: "",
    img: "",
    category: "",
    price: 0,
    inStock: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status

  useEffect(() => {
    // Fetch user details, including isAdmin status
    const fetchUserDetails = async () => {
      try {
        const authToken =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWNjZTk3MDQ4ZDBmMzQyMjVkYmY3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDU4MTA4NiwiZXhwIjoxNzAwODQwMjg2fQ.g6h0OHxcyYQLGfWQ4q4b5KkMJ5Kbv2bPq3xy-ey9Hbs";

        const res = await axios.get("http://localhost:5000/api/users/details", {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        });

        setIsAdmin(res.data.isAdmin);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        // Handle error fetching user details
      }
    };

    fetchUserDetails();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const authToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWNjZTk3MDQ4ZDBmMzQyMjVkYmY3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDU4MTA4NiwiZXhwIjoxNzAwODQwMjg2fQ.g6h0OHxcyYQLGfWQ4q4b5KkMJ5Kbv2bPq3xy-ey9Hbs";
      console.log("Auth Token:", authToken);

      const res = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      });

      setProducts(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token expired. Refresh or re-authenticate.");
      } else {
        setError("Error fetching products");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    try {
      setLoading(true);

      const authToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWNjZTk3MDQ4ZDBmMzQyMjVkYmY3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDU4MTA4NiwiZXhwIjoxNzAwODQwMjg2fQ.g6h0OHxcyYQLGfWQ4q4b5KkMJ5Kbv2bPq3xy-ey9Hbs";

      const res = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts([...products, res.data]);
      setNewProduct({
        title: "",
        desc: "",
        img: "",
        category: "",
        price: 0,
        inStock: true,
      });
    } catch (error) {
      setError("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId) => {
    try {
      setLoading(true);

      const authToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWNjZTk3MDQ4ZDBmMzQyMjVkYmY3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDU4MTA4NiwiZXhwIjoxNzAwODQwMjg2fQ.g6h0OHxcyYQLGfWQ4q4b5KkMJ5Kbv2bPq3xy-ey9Hbs";

      const productDetailsRes = await axios.get(
        `http://localhost:5000/api/products/find/${productId}`,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedProductDetails = {
        title: newProduct.title || productDetailsRes.data.title,
        desc: newProduct.desc || productDetailsRes.data.desc,
        img: newProduct.img || productDetailsRes.data.img,
        category: newProduct.category || productDetailsRes.data.category,
        price: newProduct.price || productDetailsRes.data.price,
        inStock: newProduct.inStock || productDetailsRes.data.inStock,
      };

      const updateRes = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        updatedProductDetails,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts(
        products.map((product) =>
          product._id === productId ? updateRes.data : product
        )
      );
      setNewProduct({
        title: "",
        desc: "",
        img: "",
        category: "",
        price: 0,
        inStock: true,
      });
    } catch (error) {
      setError("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);

      const authToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWNjZTk3MDQ4ZDBmMzQyMjVkYmY3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDU4MTA4NiwiZXhwIjoxNzAwODQwMjg2fQ.g6h0OHxcyYQLGfWQ4q4b5KkMJ5Kbv2bPq3xy-ey9Hbs";

      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      });

      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      setError("Error deleting product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <Navbar />
      <Container>
        <h1>Product Page</h1>
        <Form>
          <Label>Title:</Label>
          <Input
            type="text"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            required
          />

          <Label>Description:</Label>
          <Input
            type="text"
            value={newProduct.desc}
            onChange={(e) =>
              setNewProduct({ ...newProduct, desc: e.target.value })
            }
            required
          />

          <Label>Image URL:</Label>
          <Input
            type="text"
            value={newProduct.img}
            onChange={(e) =>
              setNewProduct({ ...newProduct, img: e.target.value })
            }
            required
          />

          <Label>Category:</Label>
          <Input
            type="text"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
          />

          <Label>Price:</Label>
          <Input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />

          <Label>In Stock:</Label>
          <CheckboxInput
            type="checkbox"
            checked={newProduct.inStock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, inStock: e.target.checked })
            }
          />

          <Button type="button" onClick={() => addProduct()} disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>

          <Button
            type="button"
            onClick={() => updateProduct(newProduct._id)}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </Form>

        {error && (
          <ErrorContainer>
            <p style={{ color: "red" }}>
              {error === "Unauthorized" ? (
                <span>
                  You do not have permission to perform this action. Please log
                  in as an administrator.
                </span>
              ) : (
                `Error: ${error}`
              )}
            </p>
          </ErrorContainer>
        )}
        <h3>Products in Database</h3>
        <ProductsList>
          {loading ? (
            <p>Loading...</p>
          ) : (
            products.map((product) => (
              <ProductItem key={product._id}>
                {product.title} - {product.price}
                <ProductButtons>
                  <Button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                  <Button type="button" onClick={() => setNewProduct(product)}>
                    Edit
                  </Button>
                </ProductButtons>
              </ProductItem>
            ))
          )}
        </ProductsList>
      </Container>
    </MainContainer>
  );
};

export default ProductPage;
