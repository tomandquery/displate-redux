import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <p>displate app</p>
    <Link to="about" className="btn btn-sm btn-outline-info">more</Link>
  </div>
);

export default HomePage;
