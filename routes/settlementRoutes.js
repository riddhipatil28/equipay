const express = require("express");
const router = express.Router();
const Settlement = require("../models/Settlement");
const authMiddleware = require("../middleware/authMiddleware");

/* ADD SETTLEMENT */

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { groupId, from, to, amount } = req.body;

    const settlement = await Settlement.create({
      groupId,
      from,
      to,
      amount,
    });

    res.status(201).json(settlement);
  } catch (err) {
    res.status(500).json({ message: "Settlement failed" });
  }
});

/* GET GROUP SETTLEMENTS */

router.get("/group/:groupId", authMiddleware, async (req, res) => {
  try {
    const settlements = await Settlement.find({
      groupId: req.params.groupId,
    })
      .populate("from", "name")
      .populate("to", "name");

    res.json(settlements);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
});

module.exports = router;
/* ================= USER RECENT ACTIVITY ================= */

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const settlements = await Settlement.find({
      $or: [
        { from: req.user.id },
        { to: req.user.id },
      ],
    })
      .populate("from", "name")
      .populate("to", "name")
      .sort({ createdAt: -1 });

    res.json(settlements);
  } catch (err) {
    res.status(500).json({ message: "Failed to load activity" });
  }
});

