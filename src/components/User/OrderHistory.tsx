import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";

interface Order {
  id: string;
  product?: string;
  date?: string;
  status?: string;
}

const OrderHistory: React.FC = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setIsFetching(true);
      try {
        const orderList = await getOrderHistory(user.id);
        
        if (!Array.isArray(orderList)) {
          console.error("Invalid order data received", orderList);
          return;
        }

        setOrders(
          orderList.map((order) => ({
            id: order.id,
            product: order?.product ?? "Unknown Product",
            date: order?.date ? new Date(order.date).toLocaleDateString() : "Unknown Date",
            status: order?.status ?? "Pending",
          }))
        );
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>Please log in to view your order history.</p>;

  return (
    <div>
      <h2>Order History</h2>
      {isFetching ? <p>Loading orders...</p> : null}
      {orders.length === 0 && !isFetching ? <p>No orders found.</p> : null}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.product} - {order.date} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
