import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase";

interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  status: "pending" | "completed" | "canceled";
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, "id">) => Promise<void>;
  updateOrderStatus: (orderId: string, status: "pending" | "completed" | "canceled") => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
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
  }, []);

  const addOrder = async (order: Omit<Order, "id">) => {
    try {
      const docRef = await addDoc(collection(db, "Orders"), order);
      setOrders((prev) => [...prev, { id: docRef.id, ...order }]);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: "pending" | "completed" | "canceled") => {
    try {
      const orderRef = doc(db, "Orders", orderId);
      await updateDoc(orderRef, { status });
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await deleteDoc(doc(db, "Orders", orderId));
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, loading, addOrder, updateOrderStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};