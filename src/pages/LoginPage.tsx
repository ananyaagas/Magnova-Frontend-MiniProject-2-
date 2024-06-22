import React from "react";

// The LoginPage component allows users to log in to the application
const LoginPage = () => {
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

  return (
    <div>
      <h1>Login With Spotify</h1>
      <button className="button" onClick={handleLogin}>
        <div className="spotify">
          <div className="bar bar-dark"></div>
          <div className="bar bar-med"></div>
          <div className="bar bar-light"></div>
        </div>
      </button>
    </div>
  );
};

export default LoginPage;
