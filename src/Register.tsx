import { useState } from "react";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./api/auth";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleRegister = async () => {

    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      showError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    try {

      await registerUser(form);

      alert("Registration successful!");

      navigate("/login");

    } catch (err) {

      showError("Registration failed. Email may already exist.");

    }
  };

  return (
    <div className="login-container">

      <div className="left-panel">
        <h2>Create Your Account</h2>
        <p>Sign up to get started with CreatorsHub</p>
      </div>

      <div className="right-panel">
        <div className="reg-box">

          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="backbtn">← Back</p>
          </Link>

          <h1>REGISTER</h1>

          <div className="input-field">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({...form, firstName: e.target.value})}
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({...form, lastName: e.target.value})}
            />
          </div>

          <br/>

          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            />
          </div>

          <p className="error-message">{error}</p>

          <button className="reg-btn" onClick={handleRegister}>
            REGISTER
          </button>

          <div className="reg-noacc">
            <p>Already have an account?</p>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <p className="reg-spanmsg">Login</p>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;