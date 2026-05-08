import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import ServiceAdminCard from "./ServiceAdminCard";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const API_BASE = "https://creatorshub-backend.onrender.com/api/v1/services";

interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  thumbnail: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <h2>Admin Dashboard</h2>
        <p className="admin-content-subtitle">Manage your services and track orders</p>

        <div className="stats">

          <div className="stat-box">
            <p>Total Services</p>
            <h3>{services.length}</h3>
          </div>

          <div className="stat-box">
            <p>Current Orders</p>
            <h3>0</h3>
          </div>

          <div className="stat-box">
            <p>Completed Orders</p>
            <h3>0</h3>
          </div>

        </div>

        <div className="services-header">
          <h3>Our Services</h3>
          <button className="add-service" onClick={() => navigate("/admin/new-service")}>
            + New Service
          </button>
        </div>

        <div className="admin-services-grid">
          {loading ? (
            <p style={{ color: "#94a3b8" }}>Loading services...</p>
          ) : services.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No services yet. Add your first one!</p>
          ) : (
            services.map((service) => (
              <ServiceAdminCard
                key={service.id}
                id={service.id}
                title={service.title}
                category={service.category}
                price={service.price}
                thumbnail={service.thumbnail}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

      </div>

    </div>
  );
}
