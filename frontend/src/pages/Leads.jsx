import { useEffect, useState } from "react";
import API from "../services/api";

function Leads() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = () => {
    API.get("/leads").then(res => setLeads(res.data));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = (id) => {
    API.delete(`/leads/${id}`).then(fetchLeads);
  };

  const addLead = () => {
  const newLead = {
    leadName: "Test Lead",
    companyName: "Test Co",
    email: "test@test.com",
    status: "New"
  };

  API.post("/leads", newLead).then(fetchLeads);
};

  return (
    <div>
      <h2>Leads</h2>
      <button onClick={addLead}>Add Lead</button>

      {leads.map(lead => (
        <div key={lead._id}>
          <h3>{lead.leadName}</h3>
          <p>{lead.companyName}</p>
          <p>Status: {lead.status}</p>

          <button onClick={() => deleteLead(lead._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Leads;