import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../css/crm.css";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="crm-dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">

        <div className="grid-item">
          <h3>Total Leads</h3>
          <p className="grid-data">{data.totalLeads}</p>
        </div>

        <div className="grid-item">
          <h3>New Leads</h3>
          <p className="grid-data">{data.newLeads}</p>
        </div>

        <div className="grid-item">
          <h3>Qualified</h3>
          <p className="grid-data">{data.qualified}</p>
        </div>

        <div className="grid-item">
          <h3>Won</h3>
          <p className="grid-data text-green-600">{data.won}</p>
        </div>

        <div className="grid-item">
          <h3>Lost</h3>
          <p className="grid-data text-red-600">{data.lost}</p>
        </div>

        <div className="grid-item">
          <h3>Total Deal Value</h3>
          <p className="grid-data">Rs. {data.totalValue}</p>
        </div>

        <div className="grid-item col-span-3">
          <h3>Won Deal Value</h3>
          <p className="grid-data">
            Rs. {data.wonValue}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;