import React from "react";

// Define the type for the profile prop
interface Profile {
  display_name: string; // The display name of the user
  images: { url: string }[]; // An array of image objects, each containing a URL
}

// The UserProfile component takes a profile prop and displays the user's profile information
const UserProfile = ({ profile }: { profile: Profile }) => {
  return (
    <div>
      {/* Display the user's display name */}
      <h2>{profile.display_name}</h2>
      {/* Check if there are images and display the first one, otherwise show a fallback message */}
      {profile.images && profile.images.length > 0 ? (
        <img src={profile.images[0].url} alt="Profile" />
      ) : (
        <p>No profile image available</p>
      )}
    </div>
  );
};

export default UserProfile;
