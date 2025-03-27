import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Order } from "../components/Admin/OrderManagement";

const ordersCollection = collection(db, "orders");

export const getPendingOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(collection(db, "orders"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    user: doc.data().user || "Unknown User",
    product: doc.data().product || "Unknown Product",
    status: doc.data().status || "pending",
  }));
};

export const getOrderHistory = async (userId: string) => {
  try {
    const q = query(ordersCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const approveOrder = async (orderId: string) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "approved" });
  } catch (error) {
    console.error("Error approving order:", error);
    throw error;
  }
};

export const rejectOrder = async (orderId: string) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: "rejected" });
  } catch (error) {
    console.error("Error rejecting order:", error);
    throw error;
  }
};
