import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import LogoutButton from "../components/Auth/LogoutButton";
import BackButton from "../components/Common/BackButton";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.id));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setMobile(data.mobile || "");
            setCountry(data.address?.country || "");
            setCity(data.address?.city || "");
            setStreetName(data.address?.streetName || "");
            setStreetNumber(data.address?.streetNumber || "");
            setAdditionalInfo(data.address?.additionalInfo || "");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleSave = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          mobile,
          address: {
            country,
            city,
            streetName,
            streetNumber,
            additionalInfo,
          },
        });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <BackButton />
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</p>

      <h2>Additional Information</h2>
      <div>
        <label>Mobile Number: <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter your mobile number" /></label>
      </div>

      <h3>Address</h3>
      <div>
        <label>Country: 
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" /></label>
      </div>
      <div>
        <label>City: 
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" /></label>
      </div>
      <div>
        <label>Street Name: 
          <input type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} placeholder="Enter your street name" /></label>
      </div>
      <div>
        <label>Street Number: 
          <input type="text" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} placeholder="Enter your street number" /></label>
      </div>
      <div>
        <label>Additional Info: 
          <input type="text" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Enter additional info (optional)" /></label>
      </div>
      <div className="button-container">
        <button onClick={handleSave}>Save</button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
