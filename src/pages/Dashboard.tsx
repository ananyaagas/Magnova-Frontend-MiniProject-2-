import React, { useState, useEffect } from "react";
import UserProfile from "../components/UserProfile";
import TrackList from "../components/TrackList";

// Define the type for the profile data
interface Profile {
  display_name: string;
  images: { url: string }[];
}

// Define the type for the track data (including artist information)
interface Track {
  name: string;
  artists: { name: string }[];
  id: string; // Assuming you have an id property in your Track data
}

// The Dashboard component fetches and displays the user's profile, top tracks, and recommended tracks
const Dashboard: React.FC<{ token: string | null }> = ({ token }) => {
  const [profile, setProfile] = useState<Profile | null>(null); // State to hold the user's profile
  const [tracks, setTracks] = useState<Track[]>([]); // State to hold the user's top tracks
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]); // State to hold recommended tracks

  // Function to fetch data from the Spotify API using Fetch
  const fetchWebApi = async (url: string, method: string) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for handling in the effect
    }
  };

  useEffect(() => {
    if (!token) return; // If there's no token, do nothing

    const fetchData = async () => {
      // Fetch the user's profile
      const profileResponse = await fetchWebApi(
        "https://api.spotify.com/v1/me",
        "GET"
      );
      setProfile(profileData); // Assuming profileData is defined after parsing response

      // Fetch the user's top tracks
      const tracksResponse = await fetchWebApi(
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
        "GET"
      );
      const tracksData = tracksResponse.items.map((item: any) => ({
        name: item.name,
        artists: item.artists,
        id: item.id, // Assuming id exists in the data
      }));
      setTracks(tracksData);

      // Extract top tracks IDs
      const topTracksIds = tracksData.map((track) => track.id).join(",");

      // Fetch recommended tracks
      const recommendedResponse = await fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${topTracksIds}`,
        "GET"
      );
      const recommendedData = recommendedResponse.tracks.map((item: any) => ({
        name: item.name,
        artists: item.artists,
        id: item.id, // Assuming id exists in the data
      }));
      setRecommendedTracks(recommendedData);
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
      {tracks.length > 0 && <TrackList tracks={tracks} title="Top Tracks" />}
      {/* Display the recommended tracks if they exist, otherwise show a loading message */}
      {recommendedTracks.length > 0 && (
        <TrackList tracks={recommendedTracks} title="Recommended Tracks" />
      )}
    </div>
  );
};

export default Dashboard;
