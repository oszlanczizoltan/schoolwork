import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyObEkKr1CTsEmvANBBdkRA_yvYvumCBc",
  authDomain: "itwebshop-e607b.firebaseapp.com",
  projectId: "itwebshop-e607b",
  storageBucket: "itwebshop-e607b.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };