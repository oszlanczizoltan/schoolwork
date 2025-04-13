import React, { useState, useEffect } from "react";
import { getOrders, approveOrder, declineOrder } from "../../services/productService";

const OrderManagement: React.FC = () => {
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

  const handleApprove = async (orderId: string) => {
    await approveOrder(orderId);
    fetchOrders();
  };

  const handleDecline = async (orderId: string) => {
    await declineOrder(orderId);
    fetchOrders();
  };

  return (
    <div>
      <h2>Admin Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <ul>
              {order.products.map((product, index) => (
                <li key={index}>
                  {product.name} - ${product.price.toFixed(2)} x {product.quantity}
                </li>
              ))}
            </ul>
            {order.status === "pending" && (
              <>
                <button onClick={() => handleApprove(order.id)}>Approve</button>
                <button onClick={() => handleDecline(order.id)}>Decline</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderManagement;
