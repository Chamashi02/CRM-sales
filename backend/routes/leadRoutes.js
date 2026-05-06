const express = require("express");
const router = express.Router();
const Lead = require("../models/lead");


// ➤ CREATE lead
router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ GET single lead
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ UPDATE lead
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


// ➤ DELETE lead
router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ➤ ADD NOTE
router.post("/:id/notes", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    lead.notes.push(req.body);

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;