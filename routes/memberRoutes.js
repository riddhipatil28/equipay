const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const authMiddleware = require("../middleware/authMiddleware");


// -------------------------------
// GET ALL MEMBERS (FIXED)
// -------------------------------

router.get("/", authMiddleware, async (req, res) => {
  try {

    // Fetch ALL members from DB
    const members = await Member.find();

    res.status(200).json(members);

  } catch (error) {
    console.error("Fetch members error:", error);
    res.status(500).json({ message: "Failed to fetch members" });
  }
});


// -------------------------------
// ADD NEW MEMBER
// -------------------------------

router.post("/", authMiddleware, async (req, res) => {
  try {

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Member name is required" });
    }

    const newMember = new Member({
      name,
      createdBy: req.user.userId // linked to logged in user
    });

    await newMember.save();

    res.status(201).json(newMember);

  } catch (error) {
    console.error("Add member error:", error);
    res.status(500).json({ message: "Failed to add member" });
  }
});

module.exports = router;
