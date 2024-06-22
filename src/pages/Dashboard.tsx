import React, { useState, useEffect } from "react";
import UserProfile from "../components/UserProfile";
import TrackList from "../components/TrackList";

// ... other imports

// Define the type for the profile data
interface Profile {
  display_name: string;
  images: { url: string }[];
}

// The Dashboard component fetches and displays the user's profile and top tracks
const Dashboard = ({ token }: { token: string | null }) => {
  const [profile, setProfile] = useState<Profile | null>(null); // State to hold the user's profile
  const [tracks, setTracks] = useState<any[]>([]); // State to hold the user's top tracks

  useEffect(() => {
    if (!token) return; // If there's no token, do nothing

    // Function to fetch the user's profile and top tracks
    const fetchData = async () => {
      // Fetch the user's profile
      const profileResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await profileResponse.json(); // Parse the profile data as JSON
      setProfile(profileData); // Set the profile data in the state

      // Fetch the user's top tracks
      const tracksResponse = await fetch(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tracksData = await tracksResponse.json(); // Parse the tracks data as JSON
      setTracks(tracksData.items); // Set the tracks data in the state
    };

    fetchData(); // Call the fetchData function
  }, [token]); // Dependency array, re-run the effect if the token changes

  if (!token) {
    return <div>Please log in</div>; // If there's no token, prompt the user to log in
  }

  return (
    <div>
      {/* Display the user's profile if it exists, otherwise show a loading message */}
      {profile ? <UserProfile profile={profile} /> : <p>Loading profile...</p>}
      {/* Display the user's top tracks if they exist, otherwise show a loading message */}
      {tracks.length > 0 ? (
        <TrackList tracks={tracks} />
      ) : (
        <p>Loading tracks...</p>
      )}
    </div>
  );
};

export default Dashboard;
