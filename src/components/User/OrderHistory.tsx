import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import BackButton from "../Common/BackButton";
import { getOrders } from "../../services/productService";



const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<{ id: string; userId: string; products: any[]; status: string }[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const pastOrders = orders.filter((order) => order.userId === user?.id);

  return (
    <div className="orders-container">
      <div className="orders-column">
        <BackButton />
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          pastOrders.map((order) => (
            <div key={order.id} className="order-box">
              <h3>Order ID: {order.id}</h3>
              <p>Status: {order.status}</p>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - ${product.price.toFixed(2)} x {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
