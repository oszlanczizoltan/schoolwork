import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const transactionsCollection = collection(db, "Transactions");

export const getTransactions = async () => {
  const snapshot = await getDocs(transactionsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTransaction = async (transactionData: {
  userId: string;
  carId: string;
  action: "buy" | "rent";
  status: "pending" | "approved" | "declined";
}) => {
  await addDoc(transactionsCollection, transactionData);
};

export const updateTransactionStatus = async (
  transactionId: string,
  status: "approved" | "declined"
) => {
  await updateDoc(doc(db, "Transactions", transactionId), { status });
};