import React from "react";

// Define the type for the track prop
interface Track {
  name: string;
  artists: { name: string }[];
}

// Define the type for the tracks prop
interface TrackListProps {
  tracks: Track[];
}

// The TrackList component displays a list of the user's top tracks
const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <div>
      <h2>Top Tracks</h2>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
