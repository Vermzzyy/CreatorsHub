import { loginUser } from './api/auth'
import { useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    setError("");

    if (!username || !password) {
      setError("Please enter email and password.");

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    try {

      const data = await loginUser(username, password);

      localStorage.setItem("token", data.token);

      alert("Login successful!");

      navigate("/home");
    } catch (err) {

      setError("Invalid email or password.");

      setTimeout(() => {
        setError("");
      }, 3000);

    }
  };


  return (
    <div className="login-container">
      <div className="left-panel">
        <h2 className="title">Welcome back!</h2>
        <p className="subtitle">Sign in to get started</p>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <Link to = '/' style={{ textDecoration: "none" }}>
<p className="backbtn">← Back</p>
          </Link>
          <h1>LOGIN</h1>

          <div className="input-field">
          <input
            type="email"
            placeholder=" Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          
          <div className="input-field">
          <input
            type="password"
            placeholder=" Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <p className="error-message">{error}</p>          
          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>
                    
            <div className="login-noacc">
              <p>Don't have an account?</p>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <p className="login-spanmsg">Register</p>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
