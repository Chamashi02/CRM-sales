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
  try {
    const lead = await Lead.findById(req.params.id);
    lead.status = req.body.status;
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/notes", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    lead.notes.push({
      content: req.body.content,
      createdBy: req.body.createdBy
    });

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;