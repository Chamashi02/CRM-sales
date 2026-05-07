const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const leadSchema = new mongoose.Schema(
  {
    leadName: String,
    companyName: String,
    email: String,
    phone: String,
    source: String,
    assignedTo: String,

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New"
    },

    dealValue: {
      type: Number,
      default: 0
    },

    activity: [
  {
    type: {
      type: String,
      enum: ["note", "status", "system"],
          default: "note"
    },
    content: String,
    createdBy: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
]
  },
  { timestamps: true }
);

module.exports = mongoose.models.Lead || mongoose.model("Lead", leadSchema);