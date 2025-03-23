import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Common/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Graphics Card Webshop</h1>
      <p>Find the best GPUs at the best prices!</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
