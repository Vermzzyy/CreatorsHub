import { useState, useEffect } from 'react';
import AuthNavbar from '../../shared/components/AuthNavbar';
import { getProfile } from '../settings/api/userApi';
import { Link } from 'react-router-dom';
import './Home.css';

const ORDERS_API = 'http://localhost:8080/api/v1/orders/my';

interface Order {
  id: number;
  serviceTitle: string;
  price: string;
  status: string;
  createdAt: string;
}

function HomePage() {
  const [firstName, setFirstName] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('firstName');
    if (cached) setFirstName(cached);

    getProfile()
      .then((profile) => {
        const data = profile.data ? profile.data : profile;
        const name = data.firstName || data.name || '';
        if (name) {
          setFirstName(name);
          localStorage.setItem('firstName', name);
        }
      })
      .catch(() => {
      });

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(ORDERS_API, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          const sorted = data.sort((a: Order, b: Order) => a.id - b.id);
          setOrders(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'status-completed';
      case 'IN_PROGRESS': return 'status-inprogress';
      case 'PENDING': return 'status-pending';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="home-wrapper">
      <AuthNavbar />

      <section className="home-hero">
        <div className="home-hero-content">
          <h1 className="home-greeting">
            Welcome, <span className="home-name-highlight">{firstName || 'there'}!</span>
          </h1>
          <p className="home-subtitle">
            Discover designers, developers, editors, and creators<br />
            ready to bring your ideas to life.
          </p>
          <Link to="/services">
            <button className="home-cta-btn">BOOK A SERVICE</button>
          </Link>
        </div>
      </section>

      <section className="home-orders-section">
        <div className="home-orders-header">
          <div>
            <h2 className="home-orders-title">My Orders</h2>
            <p className="home-orders-subtitle">Track and manage your active bookings</p>
          </div>
        </div>

        <div className="home-orders-grid">
          {loadingOrders ? (
            <p style={{ color: '#6b7280' }}>Loading your orders...</p>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="home-order-card">
                <div className="home-order-card-top">
                  <div className="home-order-number">ORDER #{order.id}</div>
                  <span className={`home-order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <h3 className="home-order-title">{order.serviceTitle}</h3>
                <p className="home-order-service">Service ID: {order.id}</p>

                <div className="home-order-card-bottom">
                  <span className="home-order-date">📅 {new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="home-order-price">₱{order.price}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="home-no-orders">
              <p>You haven't booked any services yet.</p>
              <Link to="/services">
                <button className="home-order-details-btn" style={{ marginTop: '10px' }}>Browse Services</button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-content">
          <div className="home-footer-left">
            <h3 className="home-footer-logo">CREATORS HUB</h3>
            <p className="home-footer-tagline">
              Connecting talent and opportunity through a<br />seamless digital marketplace.
            </p>
          </div>
          <div className="home-footer-right">
            <h4>Contact</h4>
            <p>support@creatorshub.com</p>
            <p>+1 (555) 123-4567</p>
            <p>Education District, Learning City</p>
          </div>
        </div>
        <div className="home-footer-bottom">
          <p>© 2026 CreatorsHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
