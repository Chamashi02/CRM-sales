import React, { useState } from "react";
import "../css/crm.css";
import axios from "axios";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: form.email,
      password: form.password
    });

    // Save token
    localStorage.setItem("token", res.data.token);

    alert("Login successful!");

    console.log(res.data);

    // optional redirect later
    // window.location.href = "/dashboard";

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

    return (
    <main className="login-main">
      <div className="login-card">
        <div className="login-header">
            <p>WELCOME BACK</p>  
            <h2>Login to your account</h2>
            <h3>Enter your credentials to access your account.</h3>
        </div>  

        <form className="login-form" onSubmit={handleSubmit}>
            <div>
                <label label="email">Email</label>
                <input className="fields" type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
            <div>
                <label label="password">Password</label>
                <input className="fields" type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
            </div>
            <div className="btn-forgotpw">
                <span className="forgot-pw">Forgot password?</span>
            </div>
            <div> 
                <button className="btn" type="submit">Login</button>
            </div>   
            
        </form>

        <div className="signup-link">
          Don’t have an account?{" "}
          <span className="signup-btn">
            Sign up
          </span>
        </div>
      </div>
    </main> 
    );
};

export default Login;