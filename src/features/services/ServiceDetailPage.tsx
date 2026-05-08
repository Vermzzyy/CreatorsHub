import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthNavbar from '../../shared/components/AuthNavbar';
import './ServiceDetail.css';

const API_BASE = 'https://creatorsbackend-6f3r.onrender.com/api/v1/services';
const ORDERS_API = 'https://creatorsbackend-6f3r.onrender.com/api/v1/orders';

interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  thumbnail: string;
}

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [instructions, setInstructions] = useState('');
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (res.ok) {
          const data: Service = await res.json();
          setService(data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to fetch service:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleBookService = async () => {
    if (!instructions.trim()) {
      alert("Please provide some instructions for the booking.");
      return;
    }

    setBooking(true);
    setBookingSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to book a service.");
        navigate("/login");
        return;
      }

      const res = await fetch(ORDERS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: service?.id,
          instructions: instructions
        })
      });

      if (res.ok) {
        setBookingSuccess(true);
        setInstructions("");
      } else {
        const msg = await res.text();
        alert("Booking failed: " + msg);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Network error. Is the backend running?");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="sdet-page">
        <AuthNavbar />
        <div className="sdet-not-found">
          <p>Loading service...</p>
        </div>
      </div>
    );
  }

  if (notFound || !service) {
    return (
      <div className="sdet-page">
        <AuthNavbar />
        <div className="sdet-not-found">
          <span>😕</span>
          <h2>Service not found</h2>
          <button className="sdet-back-btn" onClick={() => navigate('/services')}>
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sdet-page">
      <AuthNavbar />

      <div className="sdet-content">
        <button className="sdet-back-btn" onClick={() => navigate('/services')}>
          ← Back to Services
        </button>

        <div className="sdet-layout">

          <div className="sdet-left">
            <div className="sdet-thumb">
              {service.thumbnail ? (
                <img src={service.thumbnail} alt={service.title} className="sdet-thumb-img" />
              ) : (
                <span className="sdet-thumb-emoji">🛠️</span>
              )}
              <div className="sdet-thumb-overlay">
                <span className="sdet-thumb-title">{service.title}</span>
              </div>
            </div>

            <div className="sdet-tags">
              {service.tags.map((tag) => (
                <span key={tag} className="sdet-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="sdet-right">
            <div className="sdet-detail-card">

              <h1 className="sdet-service-title">{service.title}</h1>

              <div className="sdet-meta-row">
                <div className="sdet-meta-item">
                  <span className="sdet-meta-label">Category</span>
                  <span className="sdet-meta-value">{service.category}</span>
                </div>
                <div className="sdet-meta-item">
                  <span className="sdet-meta-label">Price Range</span>
                  <span className="sdet-meta-value sdet-price">₱{service.price}</span>
                </div>
              </div>

              <hr className="sdet-divider" />

              <h3 className="sdet-section-label">Description</h3>
              <p className="sdet-description">{service.description}</p>

              <hr className="sdet-divider" />

              <h3 className="sdet-section-label">Order Instructions</h3>
              <p className="sdet-instructions-hint">
                Describe your requirements, references, or any specific details for the provider.
              </p>
              <textarea
                className="sdet-textarea"
                placeholder="e.g. I need a dark-themed dashboard with 5 screens..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={5}
              />

              {bookingSuccess && (
                <div className="sdet-success-msg">
                  ✅ Booking request sent! The provider will reach out shortly.
                </div>
              )}

              <button 
                className="sdet-book-btn" 
                onClick={handleBookService}
                disabled={booking}
              >
                {booking ? 'BOOKING...' : 'BOOK SERVICE'}
              </button>

            </div>
          </div>
        </div>
      </div>

      <footer className="svc-footer">
        <div className="svc-footer-inner">
          <div>
            <h3 className="svc-footer-logo">CREATORS HUB</h3>
            <p className="svc-footer-tag">Connecting talent and opportunity through a seamless digital marketplace.</p>
          </div>
          <div className="svc-footer-right">
            <h4>Contact</h4>
            <p>support@creatorshub.com</p>
            <p>+1 (555) 123-4567</p>
            <p>Education District, Learning City</p>
          </div>
        </div>
        <div className="svc-footer-bottom">
          <p>© 2026 CreatorsHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
