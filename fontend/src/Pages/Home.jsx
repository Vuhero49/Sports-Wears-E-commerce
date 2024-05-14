import React from 'react';
import './CSS/Home.css';
import { Link } from 'react-router-dom';
import logo from "../Components/Assets/liverpool-big.png";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to our store!</h1>
      <p>Explore our latest collections and enjoy shopping with us.</p>
      <img src={logo} alt="" />
      <Link to="/shop">
        <button className="shop-button">Shop Now</button>
      </Link>
    </div>
  );
}

export default Home;
