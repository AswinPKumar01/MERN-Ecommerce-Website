import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
