import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PaySuccess from "./components/PaySuccess";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import BuyPage from "./pages/BuyPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import About from "./pages/About";
import CRUD from "./pages/CRUD";
import { inject } from "@vercel/analytics";

inject();

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/crud" element={<CRUD />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<BuyPage />} />

        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route path="/success" element={<PaySuccess />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
