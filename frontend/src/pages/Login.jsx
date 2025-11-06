import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container-new">
        <div className="auth-form-section">
          <h1 className="auth-title">Login</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label>Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="register-button">Login</button>
          </form>
          <div className="auth-footer">
            Don't have an account? <Link to="/signup" className="auth-footer-link">Sign Up</Link>
          </div>
        </div>
        <div className="auth-illustration">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="320" cy="100" r="40" fill="#FF6B9D" opacity="0.8"/>
            <circle cx="280" cy="180" r="60" fill="#4A90E2" opacity="0.7"/>
            <circle cx="350" cy="250" r="35" fill="#FFC107" opacity="0.8"/>
            <circle cx="250" cy="120" r="25" fill="#C2E9FB" opacity="0.6"/>
            <rect x="180" y="150" width="120" height="200" rx="10" fill="#FFFFFF" stroke="#333" strokeWidth="3"/>
            <rect x="195" y="165" width="90" height="120" fill="#E8F4F8"/>
            <path d="M 100 300 Q 150 250 200 300" stroke="#4CAF50" strokeWidth="3" fill="none"/>
            <path d="M 80 320 L 100 300 L 90 310 Z" fill="#4CAF50"/>
            <circle cx="120" cy="200" r="45" fill="#6C5CE7" opacity="0.7"/>
            <ellipse cx="140" cy="280" r="30" ry="20" fill="#FD79A8" opacity="0.6"/>
            <polygon points="320,320 340,360 300,360" fill="#00B894" opacity="0.7"/>
            <rect x="60" y="340" width="15" height="40" fill="#FDCB6E" opacity="0.6"/>
            <rect x="350" y="330" width="12" height="50" fill="#74B9FF" opacity="0.6"/>
            <circle cx="380" cy="320" r="8" fill="#FFD93D"/>
            <path d="M 50 360 Q 60 350 70 360" stroke="#A29BFE" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
