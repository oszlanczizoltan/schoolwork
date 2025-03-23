import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};