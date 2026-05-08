import { useNavigate, useLocation } from "react-router-dom";
import "./Admin.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("firstName");
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">

      <div>
        <div className="admin-logo">
          <h3>CREATORS HUB</h3>
          <p>Connecting talent and opportunity through a seamless digital marketplace.</p>
        </div>

        <div className="admin-menu">
          <button
            className={`menu-btn ${isActive("/admin") ? "active" : ""}`}
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </button>
          <button
            className={`menu-btn ${isActive("/admin/new-service") ? "active" : ""}`}
            onClick={() => navigate("/admin/new-service")}
          >
            New Service
          </button>
          <button
            className={`menu-btn ${isActive("/admin/order-history") ? "active" : ""}`}
            onClick={() => navigate("/admin/order-history")}
          >
            Order History
          </button>
        </div>
      </div>

      <button className="admin-logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>

    </div>
  );
}
