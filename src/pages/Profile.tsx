import React from "react";
import { useAuth } from "../hooks/useAuth";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</p>
    </div>
  );
};

export default Profile;
