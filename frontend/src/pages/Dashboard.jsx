import React from "react";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../css/crm.css";

function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    API.get("/leads").then(res => setLeads(res.data));
  }, []);

  const total = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const won = leads.filter(l => l.status === "Won").length;

  return (
    <div className="crm-dashboard">
      <h2>Dashboard</h2>
      <p>Total Leads: {total}</p>
      <p>New Leads: {newLeads}</p>
      <p>Won Leads: {won}</p>
    </div>
  );
}

export default Dashboard;