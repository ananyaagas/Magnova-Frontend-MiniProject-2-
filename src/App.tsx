import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./styles/globals.css"; // Import the consolidated CSS file

// The App component is the main component of the application
const App = () => {
  const [token, setToken] = useState<string | null>(null); // State to hold the authentication token

  useEffect(() => {
    const hash = window.location.hash; // Get the hash from the URL
    let token = window.localStorage.getItem("token"); // Get the token from local storage

    // If there's no token and the hash contains an access token, extract and store it
    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get("access_token");
      window.location.hash = ""; // Clear the hash from the URL
      if (token) {
        window.localStorage.setItem("token", token); // Store the token in local storage
        setToken(token); // Set the token in the state
      }
    } else {
      setToken(token); // Set the token from local storage in the state
    }
  }, []);

  return (
    <Router>
      <div>
        {/* Render the navigation bar */}
        <NavBar />
        <main>
          {/* Define the routes for the application */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home page route */}
            <Route path="/login" element={<LoginPage />} />{" "}
            {/* Login page route */}
            <Route
              path="/dashboard"
              element={<Dashboard token={token} />}
            />{" "}
            {/* Dashboard page route, passes the token as a prop */}
          </Routes>
        </main>
        {/* Render the footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
