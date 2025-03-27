import { auth } from "./firebase";
import { db, doc, setDoc, serverTimestamp } from "../services/firebase";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string, role: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    role,
    createdAt: serverTimestamp(),
  });

  return user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};