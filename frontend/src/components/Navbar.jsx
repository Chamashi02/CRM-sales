import React from "react";
import { Link } from "react-router-dom";
import "../css/crm.css";

const Navbar = () => {
  return (
    <nav className="crm-nav-bar">
        <div className="crm-logo-text">
          <h2 className="logo-name">CRM</h2>
          <span className="logo-sub">SALES</span>
        </div>

      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/leads">Leads</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
