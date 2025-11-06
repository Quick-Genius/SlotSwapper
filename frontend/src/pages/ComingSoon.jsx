import { useNavigate } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <div className="coming-soon-icon"></div>
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-description">
          This feature is currently under development and will be available soon.
        </p>
        <div className="coming-soon-features">
          <div className="feature-item">
            <span className="feature-icon">✨</span>
            <span className="feature-text">Exciting new features</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">Enhanced functionality</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Improved performance</span>
          </div>
        </div>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
      <div className="coming-soon-illustration">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="80" fill="#DEEBFF" opacity="0.5"/>
          <circle cx="200" cy="150" r="60" fill="#4C9AFF" opacity="0.3"/>
          <circle cx="200" cy="150" r="40" fill="#0052CC" opacity="0.5"/>
          <path d="M 200 110 L 200 150 L 230 150" stroke="#0052CC" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <circle cx="200" cy="150" r="8" fill="#0052CC"/>
          <rect x="160" y="200" width="80" height="60" rx="5" fill="#F4F5F7" stroke="#DFE1E6" strokeWidth="2"/>
          <line x1="170" y1="215" x2="230" y2="215" stroke="#6B778C" strokeWidth="2"/>
          <line x1="170" y1="230" x2="220" y2="230" stroke="#6B778C" strokeWidth="2"/>
          <line x1="170" y1="245" x2="225" y2="245" stroke="#6B778C" strokeWidth="2"/>
          <circle cx="100" cy="80" r="15" fill="#00B8D9" opacity="0.6"/>
          <circle cx="300" cy="100" r="20" fill="#36B37E" opacity="0.6"/>
          <circle cx="320" cy="220" r="18" fill="#FFAB00" opacity="0.6"/>
          <circle cx="80" cy="240" r="12" fill="#FF5630" opacity="0.6"/>
        </svg>
      </div>
    </div>
  );
};

export default ComingSoon;
