import React, { useState } from "react";
import { approveOrder, rejectOrder, getPendingOrders } from "../../services/orderService";

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<{ id: string; user: string; product: string; status: string }[]>([]);

  const fetchOrders = async () => {
    try {
      const pendingOrders = await getPendingOrders();
      setOrders(pendingOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleApprove = async (orderId: string) => {
    await approveOrder(orderId);
    fetchOrders();
  };

  const handleReject = async (orderId: string) => {
    await rejectOrder(orderId);
    fetchOrders();
  };

  return (
    <div>
      <h2>Order Management</h2>
      <button onClick={fetchOrders}>Refresh Orders</button>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.user} ordered {order.product}
            <button onClick={() => handleApprove(order.id)}>Approve</button>
            <button onClick={() => handleReject(order.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;
