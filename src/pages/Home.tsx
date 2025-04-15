import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-page-container">
      <div className="home-review home-review-left">
        <p>
          "This webshop has completely changed the way I shop for electronics. The prices are unbeatable, 
          and the quality of the products is top-notch. I highly recommend it to 
          anyone looking for the best deals!"
        </p>
      </div>
      <div className="home-main-content">
        <h1>Welcome to the Electronics Webshop!</h1>
        <h2>Find the best products, at the lowest prices!</h2>
        <Link to="/products" className="home-view-products-btn">Browse products!</Link>
      </div>
      <div className="home-review home-review-right">
        <p>
          "I was amazed by the fast delivery and friendly customer service. 
          The team went above and beyond ensuring my satisfaction. Never knew online shopping can be this easy!
          I will be coming back for more purchases!"
        </p>
      </div>
    </div>
  );
};

export default Home;
