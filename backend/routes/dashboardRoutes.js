const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();

    const totalLeads = leads.length;

    const newLeads = leads.filter(l => l.status === "New").length;
    const qualified = leads.filter(l => l.status === "Qualified").length;
    const won = leads.filter(l => l.status === "Won").length;
    const lost = leads.filter(l => l.status === "Lost").length;

    const totalValue = leads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

    const wonValue = leads
      .filter(l => l.status === "Won")
      .reduce((sum, l) => sum + (l.dealValue || 0), 0);

    res.json({
      totalLeads,
      newLeads,
      qualified,
      won,
      lost,
      totalValue,
      wonValue
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;