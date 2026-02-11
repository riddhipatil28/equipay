const express = require("express");
const mongoose = require("mongoose");
const Group = require("../models/Group");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= CREATE GROUP ================= */

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, memberIds } = req.body;

    if (!name || memberIds.length < 1) {
      return res.status(400).json({ message: "Invalid group data" });
    }

    const finalMembers = [
      new mongoose.Types.ObjectId(req.user.id),
      ...memberIds.map((id) => new mongoose.Types.ObjectId(id)),
    ];

    const group = await Group.create({
      name,
      members: finalMembers,
      createdBy: req.user.id,
    });

    res.status(201).json(group);

  } catch (err) {
    console.error("GROUP CREATE ERROR:", err);
    res.status(500).json({ message: "Group creation failed" });
  }
});

/* ================= GET MY GROUPS ================= */

router.get("/", authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user.id,
    })
      .populate("members", "name email")
      .populate("expenses");

    res.json(groups);

  } catch (err) {
    console.error("FETCH GROUPS ERROR:", err);
    res.status(500).json({ message: "Failed to load groups" });
  }
});

/* ================= GET GROUP DETAILS ================= */

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "name email phoneNumber")
      .populate("expenses");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(group);

  } catch (err) {
    console.error("GET GROUP ERROR:", err);
    res.status(500).json({ message: "Failed to load group" });
  }
});

module.exports = router;
/* ================= DELETE GROUP ================= */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Optional: allow only creator to delete
    if (group.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Group.findByIdAndDelete(req.params.id);

    res.json({ message: "Group deleted successfully" });

  } catch (err) {
    console.error("DELETE GROUP ERROR:", err);
    res.status(500).json({ message: "Failed to delete group" });
  }
});
