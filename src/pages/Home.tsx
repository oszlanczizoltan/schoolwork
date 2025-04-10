import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to my Electronics Webshop!</h1>
      <p>Find the best products, at the lowest prices!</p>
      <Link to="/products" className="view-products-btn">Click here to view everything</Link>
    </div>
  );
};

export default Home;
