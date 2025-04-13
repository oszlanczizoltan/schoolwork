import React, { useState, useEffect } from "react";
import { getOrderHistory } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../Common/BackButton";

interface Order {
  id: string;
  products: { name: string; price: number; quantity: number }[];
  status: string;
}

const OrderHistory: React.FC = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const orderList = await getOrderHistory(user.id);

      const mappedOrders = orderList.map((order: any) => ({
        id: order.id,
        products: order.products || [],
        status: order.status || "unknown",
      }));

      setOrders(mappedOrders);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>Please log in to view your order history.</p>;

  return (
    <div>
      <BackButton />
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - ${product.price.toFixed(2)} x {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
