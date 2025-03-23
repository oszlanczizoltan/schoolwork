import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../../services/orderService";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<{ id: string; product: string; date: string; status: string }[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderList = await getOrderHistory();
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
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
