const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.json(savedLead);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id/status", async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  const oldStatus = lead.status;
  lead.status = req.body.status;

  lead.activity.push({
    type: "status",
    content: `${oldStatus} → ${req.body.status}`,
    createdBy: "Admin",
    createdAt: new Date()
  });

  await lead.save();
  res.json(lead);
});

router.post("/:id/activity", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    lead.activity.push({
      type: req.body.type || "note",
      content: req.body.content,
      createdBy: req.body.createdBy,
      createdAt: new Date()
    });

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;