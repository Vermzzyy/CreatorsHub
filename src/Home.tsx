import { useState } from "react";
import './Login.css';

function Home() {
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
        <h2>Welcome Back!</h2>
        <p>Sign in to get started</p>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <h3>LOGIN</h3>

          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />

          <p className="login-link">
                    Don't have an account?
                    <a href="">Register</a>
                </p>
      
          <button className="login-btn">LOGIN</button>
        </div>
      </div>
    </div>
  );
};


export default Home;
