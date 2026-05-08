import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import OrderCard from "./OrderCard";
import "./Admin.css";

const ORDERS_API = "https://creatorsbackend-6f3r.onrender.com/api/v1/orders";

interface Order {
  id: number;
  userId: number;
  serviceTitle: string;
  price: string;
  status: string;
  instructions: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(ORDERS_API);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`${ORDERS_API}/${id}/status?status=${newStatus}`, {
        method: "PATCH"
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>Order History</h2>
        <p className="admin-content-subtitle">Review and manage all past orders</p>
        <div className="orders-container">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                userId={order.userId}
                serviceTitle={order.serviceTitle}
                price={order.price}
                status={order.status}
                instructions={order.instructions}
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
