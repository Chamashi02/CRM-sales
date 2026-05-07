import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/crm.css";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

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
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const createLead = async () => {
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
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.leadName?.toLowerCase().includes(search.toLowerCase()) ||
      lead.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? lead.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="leads-main">
      <div className="crm-leads">
        <h2>Leads</h2>

        <div className="leads-actions">
          <button className="btn" onClick={() => setShowForm(true)}>
            New Lead
          </button>

          <input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Won</option>
            <option>Lost</option>
          </select>
        </div>

        {showForm && (
          <div className="lead-form">
            {Object.keys(newLead).map((key) => (
              <input
                key={key}
                name={key}
                placeholder={key}
                value={newLead[key]}
                onChange={handleNewLeadChange}
              />
            ))}

            <button className="btn" onClick={createLead}>Save</button>
            <button className="btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}

        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned</th>
              <th>Value</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead._id}
                className="leads-row"
                onClick={() => navigate(`/leads/${lead._id}`)}
              >
                <td>{lead.leadName}</td>
                <td>{lead.companyName}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.assignedTo}</td>
                <td>Rs. {lead.dealValue}</td>

                <td>
                  <span className={`status-badge status-${lead.status?.toLowerCase().replace(" ", "-")}`}>
                    {lead.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLead(lead._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </main>
  );
}

export default Leads;