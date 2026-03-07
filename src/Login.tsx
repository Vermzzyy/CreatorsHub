import { useState } from "react";
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
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
          <p className="backbtn">Back</p>
          <h1>LOGIN</h1>

          <input
            type="email"
            placeholder=" Email"
            className="input-field"
          />

          <input
            type="password"
            placeholder=" Password"
            className="input-field"
          />
      
          <button className="login-btn">LOGIN</button>

          
          <p className="login-link">
                    Don't have an account?    
                    <a href="" className="register">Register</a>
                </p>
        </div>
      </div>
    </div>
  );
};


export default Login;
