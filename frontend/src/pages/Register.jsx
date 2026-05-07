import React, { useState } from "react";
import "../css/crm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password
    });

    alert("Account created successfully!");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

    return (
    <main className="register-main">
      <div className="register-bg" />
      <div className="register-pattern" />
      <div className="register-image-overlay" />
      <div className="register-card">
        <div className="login-header">
            <p>CREATE AN ACCOUNT</p>  
            <h2>Join with CRM-sales</h2>
            <h3>Fill in the details to create your account.</h3>
        </div>  

        <form className="register-form" onSubmit={handleSubmit}>
            <div>
                <label label="name">Name</label>
                <input className="fields" type="text" id="name" name="name"value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
            </div>
            <div>
                <label label="email">Email</label>
                <input className="fields" type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>
            <div>
                <label label="password">Create a password</label>
                <input className="fields" type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
            </div><div>
                <label label="confirm-password">Confirm Password</label>
                <input className="fields" type="password" id="confirm-password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" required />
            </div>
            <div> 
                <button className="btn" type="submit">Sign Up</button>
            </div>   
        </form>

        <div className="signup-link">
          Already have an account?{" "}
          <span className="signup-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </main> 
    );
};

export default Register;