import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNavbar from '../../shared/components/AuthNavbar';
import './Services.css';

const API_BASE = 'https://creatorsbackend-6f3r.onrender.com/api/v1/services';

export interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  thumbnail: string;
}

const CATEGORIES = ['All', 'UI/UX', 'Graphic Design', 'Game Development', '3D & Animation', 'Web Development', 'Scripting', 'Building'];

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data: Service[] = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = services.filter((s) => {
    const matchCat = category === 'All' || s.category === category;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="svc-page">
      <AuthNavbar />

      <div className="svc-content">
        <div className="svc-search-row">
          <div className="svc-search-wrap">
            <span className="svc-search-icon">🔍</span>
            <input
              className="svc-search"
              placeholder="Search a service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="svc-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`svc-cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="svc-section-header">
          <h2 className="svc-section-title">Our Services</h2>
          <p className="svc-section-sub">
            {filtered.length} service{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {loading ? (
          <div className="svc-empty">
            <p>Loading services...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="svc-empty">
            <span></span>
            <p>No services found{search ? <> for "<strong>{search}</strong>"</> : ''}</p>
          </div>
        ) : (
          <div className="svc-grid">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="svc-card"
                onClick={() => navigate(`/services/${service.id}`)}
              >
                <div className="svc-card-thumb">
                  {service.thumbnail ? (
                    <img src={service.thumbnail} alt={service.title} className="svc-card-img" />
                  ) : (
                    <span className="svc-card-emoji">🛠️</span>
                  )}
                </div>
                <div className="svc-card-body">
                  <span className="svc-card-category">{service.category}</span>
                  <h3 className="svc-card-title">{service.title}</h3>
                  <div className="svc-card-footer">
                    <span className="svc-card-price">₱{service.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
