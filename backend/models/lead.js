const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadName: String,
    companyName: String,
    email: String,
    phoneNumber: String,
    leadSource: String,
    assignedSalesperson: String,
    status: {
      type: String,
      default: "New",
    },
    dealValue: Number,
    notes: [
      {
        content: String,
        createdBy: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);