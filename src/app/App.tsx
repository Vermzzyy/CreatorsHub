import HomePage from '../features/home/HomePage'
import LandingPage from '../features/landing/LandingPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import SettingsPage from '../features/settings/SettingsPage'
import ServicesPage from '../features/services/ServicesPage'
import ServiceDetailPage from '../features/services/ServiceDetailPage'
import AdminDashboard from '../features/admin/AdminDashboard'
import NewService from '../features/admin/NewService'
import OrderHistory from '../features/admin/OrderHistory'
import ProtectedRoute from '../shared/components/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/new-service" element={
          <ProtectedRoute>
            <NewService />
          </ProtectedRoute>
        } />
        <Route path="/admin/order-history" element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
