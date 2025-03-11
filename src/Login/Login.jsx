// FILE: Login.jsx
import React from 'react';
import './Login.css';
import { fn_login } from './fn_login';

const Login = () => {
  const { username, setUsername, password, setPassword, Login } = fn_login();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="input-group">
            <label htmlFor="username" className="input-label">User Login</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  document.getElementById('password').focus();
                }
              }}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                    Login()
                }
              }}
              required
            />
          </div>
          <button className="login-button" onClick={Login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;