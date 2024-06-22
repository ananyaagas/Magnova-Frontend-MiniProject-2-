import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

// The HomePage component is the landing page of the application
const handleLogin = () => {
  const clientId = "ffd82f17caba4883b36364ba0631129e"; // Replace with your Spotify client ID
  const redirectUri = "http://localhost:5173/"; // Replace with your redirect URI
  const apiUrl = "https://accounts.spotify.com/authorize";
  const scope = "user-top-read"; // Scopes for accessing user data

  // Construct the URL for Spotify authorization
  window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}&response_type=token&show_dialog=true`;
};

const HomePage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to My Spotify Stats</h1>
      <p>
        Dive deep into your music taste! This app is your one-stop shop for all
        things Spotify stats. See your most listened tracks, discover your top
        artists, and get music recommendations.
      </p>
      <div className="button-container">
        {/* Container for buttons */}
        <div>
          <h3>Login With Spotify</h3>
          {/*           <Link to="/login" className="button login-button">
          Login With Spotify
        </Link>  */}
          <button className="button" onClick={handleLogin}>
            <div className="spotify">
              <div className="bar bar-dark"></div>
              <div className="bar bar-med"></div>
              <div className="bar bar-light"></div>
            </div>
          </button>
        </div>
        <span className="button-spacer"></span> {/* Spacer element */}
        <Link to="/dashboard" className="button dashboard-button">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
