import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  status: "pending" | "completed" | "canceled";
}

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    console.log("User in useOrders:", user);
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return { orders, loading };
};

export default useOrders;
