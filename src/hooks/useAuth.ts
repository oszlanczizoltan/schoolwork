import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const getUserData = async (uid: string): Promise<CustomUser | null> => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return {
      id: uid,
      ...userSnap.data(),
    } as CustomUser;
  }
  return null;
};
