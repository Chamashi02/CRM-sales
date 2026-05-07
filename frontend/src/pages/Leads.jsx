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

  const fetchLeads = () => {
    API.get("/leads").then(res => setLeads(res.data));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = (id) => {
    API.delete(`/leads/${id}`).then(fetchLeads);
  };

  const handleNewLeadChange = (e) => {
    setNewLead({
      ...newLead,
      [e.target.name]: e.target.value
    });
  };

  const createLead = async () => {
    try {
      await API.post("/leads", {
        ...newLead,
        dealValue: Number(newLead.dealValue) || 0
      });

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

  return (
    <main className="leads-main">
    <div className="crm-leads">
      <h2>Leads</h2>

      <button className="btn" onClick={() => setShowForm(true)}>
        New Lead
      </button>

      {showForm && (
        <div className="lead-form">
            <input className="fields" name="leadName" placeholder="Lead Name" value={newLead.leadName} onChange={handleNewLeadChange} />
            <input className="fields" name="companyName" placeholder="Company" value={newLead.companyName} onChange={handleNewLeadChange} />
            <input className="fields" name="email" placeholder="Email" value={newLead.email} onChange={handleNewLeadChange} />
            <input className="fields" name="phone" placeholder="Phone" value={newLead.phone} onChange={handleNewLeadChange} />
            <input className="fields" name="source" placeholder="Source" value={newLead.source} onChange={handleNewLeadChange} />
            <input className="fields" name="assignedTo" placeholder="Salesperson" value={newLead.assignedTo} onChange={handleNewLeadChange} />
            <input className="fields" type="number" name="dealValue" placeholder="Deal Value" value={newLead.dealValue} onChange={handleNewLeadChange} />

            <button className="btn" onClick={createLead}>
              Save Lead
            </button>
            <button className="btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
        </div>
      )}

      
      {leads.map(lead => (
        <div className="lead-item" key={lead._id}>

            <h3>{lead.leadName}</h3>
            <p>{lead.companyName}</p>
            <p>{lead.email}</p>
            <p>{lead.phone}</p>
            <p>Assigned: {lead.assignedTo}</p>
            <p>Value: Rs. {lead.dealValue}</p>

    
        <select
            className="status"
            value={lead.status}
            onChange={(e) =>
            API.patch(`/leads/${lead._id}/status`, {
            status: e.target.value
            }).then(fetchLeads)
            }
        >

        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Won</option>
        <option>Lost</option>
        </select>

        <button className="btn"
            onClick={() => {
            const note = prompt("Enter note");
            if (!note) return;

            API.post(`/leads/${lead._id}/notes`, {
            content: note,
            createdBy: "Admin"
            }).then(fetchLeads);
            }}
        >
        Add Note
        </button>

        <ul>
            {lead.notes?.map((n, i) => (
            <li key={i}>
            {n.content} ({n.createdBy})
            </li>
            ))}
        </ul>

        <button className="btn" onClick={() => deleteLead(lead._id)}>
        Delete
        </button>

        </div>
    ))}
    </div>
    </main>
  );
}

export default Leads;