import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export interface CustomUser {
  id: string;
  email: string;
  role: "admin" | "user";
  createdAt?: string;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = async () => {
    await signOut(auth);
    setUser(null);
  };

  const registerUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userDocRef = doc(db, "users", firebaseUser.uid);
    const newUser: CustomUser = {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      role: "user",
      createdAt: new Date().toISOString(),
    };

    await setDoc(userDocRef, newUser);
    setUser(newUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

        if (userDoc.exists()) {
          setUser({ id: firebaseUser.uid, email: firebaseUser.email || "", role: userDoc.data().role || "user" });
        } else {
          setUser({ id: firebaseUser.uid, email: firebaseUser.email || "", role: "user" });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
