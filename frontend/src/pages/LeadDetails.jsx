import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../css/crm.css";

function LeadDetails() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [note, setNote] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchLead = () => {
        API.get(`/leads/${id}`).then(res => setLead(res.data));
    };

    useEffect(() => {
        fetchLead();
    }, [id]);

    useEffect(() => {
        if (lead) {
            setEditData({
                leadName: lead.leadName,
                companyName: lead.companyName,
                email: lead.email,
                phone: lead.phone,
                assignedTo: lead.assignedTo,
                dealValue: lead.dealValue
            });
        }
    }, [lead]);

    if (!lead) return <p>Loading...</p>;

    return (
        <div className="lead-page">

            <div className="lead-header">
                <h2>{lead.leadName}</h2>

                <select
                    value={lead.status}
                    onChange={(e) => {
                        API.patch(`/leads/${id}/status`, {
                            status: e.target.value
                        }).then(res => setLead(res.data));
                    }}
                >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Proposal Sent</option>
                    <option>Won</option>
                    <option>Lost</option>
                </select>
            </div>

            <div className="lead-body">

                <div className="lead-left">
                    <h3>Details</h3>

                    {!isEditing ? (
                        <>
                            <div className="detail-box">
                                <p><b>Company:</b> {lead.companyName}</p>
                                <p><b>Email:</b> {lead.email}</p>
                                <p><b>Phone:</b> {lead.phone}</p>
                                <p><b>Assigned:</b> {lead.assignedTo}</p>
                                <p><b>Value:</b> Rs. {lead.dealValue}</p>
                            </div>

                            <button
                                className="btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                value={editData.leadName}
                                onChange={(e) =>
                                    setEditData({ ...editData, leadName: e.target.value })
                                }
                            />

                            <input
                                value={editData.companyName}
                                onChange={(e) =>
                                    setEditData({ ...editData, companyName: e.target.value })
                                }
                            />

                            <input
                                value={editData.email}
                                onChange={(e) =>
                                    setEditData({ ...editData, email: e.target.value })
                                }
                            />

                            <input
                                value={editData.phone}
                                onChange={(e) =>
                                    setEditData({ ...editData, phone: e.target.value })
                                }
                            />

                            <input
                                value={editData.assignedTo}
                                onChange={(e) =>
                                    setEditData({ ...editData, assignedTo: e.target.value })
                                }
                            />

                            <input
                                type="number"
                                value={editData.dealValue}
                                onChange={(e) =>
                                    setEditData({ ...editData, dealValue: e.target.value })
                                }
                            />

                            <button
                                className="btn"
                                onClick={() => {
                                    API.put(`/leads/${id}`, editData).then(() => {
                                        setIsEditing(false);
                                        fetchLead();
                                    });
                                }}
                            >
                                Save
                            </button>

                            <button
                                className="btn"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditData({
                                        leadName: lead.leadName,
                                        companyName: lead.companyName,
                                        email: lead.email,
                                        phone: lead.phone,
                                        assignedTo: lead.assignedTo,
                                        dealValue: lead.dealValue
                                    });
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>

                <div className="lead-right">
                    <h3>Activity Timeline</h3>

                    <div className="activity-box">
                        {lead.activity
                            ?.slice()
                            .reverse()
                            .map((a, i) => (
                                <div key={i} className="activity-item">

                                    <span className={`activity-type ${a.type}`}>
                                        {a.type}
                                    </span>

                                    <p>{a.content}</p>

                                    <small>
                                        {new Date(a.createdAt).toLocaleDateString()}{" "}
                                        {new Date(a.createdAt).toLocaleTimeString()}
                                    </small>

                                    <small>By {a.createdBy}</small>
                                </div>
                            ))}
                    </div>

                    <textarea
                        placeholder="Write a note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <button
                        className="btn"
                        onClick={() => {
                            if (!note.trim()) {
                                alert("Note cannot be empty");
                                return;
                            }

                            API.post(`/leads/${id}/activity`, {
                                type: "note",
                                content: note,
                                createdBy: "Admin"
                            }).then(() => {
                                setNote("");
                                fetchLead();
                            });
                        }}
                    >
                        Add Note
                    </button>
                </div>

            </div>
        </div>
    );
}

export default LeadDetails;