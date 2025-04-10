import React, { useState, useEffect } from "react";
import { getOrders, approveOrder } from "../../services/productService";

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<{ id: string; userId: string; products: any[]; status: string; timestamp: string }[]>([]);

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

  const handleApprove = async (orderId: string) => {
    await approveOrder(orderId);
    fetchOrders();
  };

  return (
    <div>
      <h2>Admin Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>User ID: {order.userId}</p>
            <p>Status: {order.status}</p>
            <p>Products:</p>
            <ul>
              {order.products.map((product, index) => (
                <li key={index}>
                  {product.name} - ${product.price} x {product.quantity}
                </li>
              ))}
            </ul>
            {order.status === "pending" && <button onClick={() => handleApprove(order.id)}>Approve</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
