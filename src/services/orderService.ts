import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export interface Order {
  id: string;
  user: string;
  product: string;
  status: string;
  date?: string;
}

const ordersCollection = collection(db, "orders");

export const getPendingOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(query(ordersCollection, where("status", "==", "pending")));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    user: doc.data().user || "Unknown User",
    product: doc.data().product || "Unknown Product",
    status: doc.data().status || "pending",
    date: doc.data().date || "Unknown Date",
  }));
};

export const getOrderHistory = async (userId: string): Promise<Order[]> => {
  const q = query(ordersCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    user: doc.data().user || "Unknown User",
    product: doc.data().product || "Unknown Product",
    status: doc.data().status || "pending",
    date: doc.data().date || "Unknown Date",
  }));
};

export const approveOrder = async (orderId: string) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, { status: "approved" });
};

export const rejectOrder = async (orderId: string) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, { status: "rejected" });
};
