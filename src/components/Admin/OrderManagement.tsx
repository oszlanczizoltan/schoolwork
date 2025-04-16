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

  const ongoingOrders = orders.filter((order) => order.status === "pending");
  const pastOrders = orders.filter((order) => order.status === "approved" || order.status === "cancelled");

  return (
    <div className="orders-container">
      <div className="orders-column">
        <h3>Ongoing Orders</h3>
        {ongoingOrders.length === 0 ? (
          <p>No ongoing orders.</p>
        ) : (
          ongoingOrders.map((order) => (
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
              <button onClick={() => handleApprove(order.id)}>Approve</button>
              <button onClick={() => handleDecline(order.id)} className="decline-button">
                Decline
              </button>
            </div>
          ))
        )}
      </div>
      <div className="orders-column">
        <h3>Past Orders</h3>
        {pastOrders.length === 0 ? (
          <p>No past orders.</p>
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

export default OrderManagement;
