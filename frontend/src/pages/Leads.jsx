import { useEffect, useState } from "react";
import API from "../services/api";
import "../css/crm.css";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newLead, setNewLead] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "",
    assignedTo: "",
    dealValue: ""
  });

  // ✅ FETCH
  const fetchLeads = () => {
    API.get("/leads").then(res => setLeads(res.data));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ DELETE
  const deleteLead = (id) => {
    API.delete(`/leads/${id}`).then(fetchLeads);
  };

  // ✅ HANDLE INPUT
  const handleNewLeadChange = (e) => {
    setNewLead({
      ...newLead,
      [e.target.name]: e.target.value
    });
  };

  // ✅ CREATE LEAD (THIS IS WHAT YOU'RE MISSING)
  const createLead = async () => {
    try {
      await API.post("/leads", newLead);

      setShowForm(false);

      setNewLead({
        leadName: "",
        companyName: "",
        email: "",
        phone: "",
        source: "",
        assignedTo: "",
        dealValue: ""
      });

      fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Failed to create lead");
    }
  };

  // 🔴 RETURN MUST COME AFTER ALL FUNCTIONS
  return (
    <div className="crm-leads">
      <h2>Leads</h2>

      <button onClick={() => setShowForm(true)}>New Lead</button>

      {/* FORM */}
      {showForm && (
        <div className="lead-form">
          <input name="leadName" placeholder="Lead Name" value={newLead.leadName} onChange={handleNewLeadChange} />
          <input name="companyName" placeholder="Company" value={newLead.companyName} onChange={handleNewLeadChange} />
          <input name="email" placeholder="Email" value={newLead.email} onChange={handleNewLeadChange} />

          <button onClick={createLead}>Save Lead</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      {/* LIST */}
      {leads.map(lead => (
        <div key={lead._id}>
          <h3>{lead.leadName}</h3>
          <button onClick={() => deleteLead(lead._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Leads;