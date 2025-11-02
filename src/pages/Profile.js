import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);

  // If user is not logged in, show a message instead of breaking
  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please login to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more profile details if needed */}
    </div>
  );
}

export default Profile;