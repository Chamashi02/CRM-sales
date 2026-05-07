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

    notes: [noteSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);