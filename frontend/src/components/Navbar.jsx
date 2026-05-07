import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/crm.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="crm-nav-bar">
        <div className="crm-logo-text">
          <h2 className="logo-name">CRM</h2>
          <span className="logo-sub">SALES</span>
        </div>

      <nav className="crm-nav">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/leads">Leads</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
      
      </nav>

    </nav>
  );
};

export default Navbar;
