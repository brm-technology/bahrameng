import React from 'react';
import { Link } from 'react-router-dom';  // Import Link
import Timeline from './News';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">BRM Engineering</h1>
        <p className="home-description">
          BRM Engineering database is a reference application featuring a 
          comprehensive standard materials database and a collection of handy 
          calculators designed for engineers. It's completely free to use, and we 
          welcome any feedback or suggestions for improvement. If you're interested 
          in contributing to the enhancement of this app by adding new databases 
          or calculators, please don't hesitate to <Link to="/contact">contact us</Link>.
        </p>
        <h6 className="home-signature">BRM</h6>
      </div>
      <Timeline />
    </div>
  );
};

export default Home;
