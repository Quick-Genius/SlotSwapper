import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>ConceptSlotSwapper</h1>
        </div>
        <div className="navbar-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </NavLink>
          <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Marketplace
          </NavLink>
          <NavLink to="/requests" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Requests
          </NavLink>
        </div>
        <div className="navbar-user">
          <span className="user-name">{user?.name}</span>
          <button onClick={logout} className="btn">Logout</button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
