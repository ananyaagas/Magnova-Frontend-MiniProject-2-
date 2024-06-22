import React from "react";
import { Link } from "react-router-dom";

// The NavBar component renders the navigation bar with links to different pages
const NavBar = () => {
  return (
    <nav>
      {/* Logo or brand name */}
      <h1>Ananya Spotify App</h1>
      {/* Navigation links */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
