import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdvF_E7Ert0WmsqkVH9hPzs40j28IOPJA",
  authDomain: "carhandling-6d6e6.firebaseapp.com",
  projectId: "carhandling-6d6e6",
  storageBucket: "carhandling-6d6e6.appspot.com",
  messagingSenderId: "85573757017",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;