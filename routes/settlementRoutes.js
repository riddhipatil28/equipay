const express = require("express");
const router = express.Router();
const Settlement = require("../models/Settlement");
const authMiddleware = require("../middleware/authMiddleware");


/* ================= ADD SETTLEMENT ================= */

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { groupId, from, to, amount, expenseId } = req.body;

    // 🚫 prevent zero or invalid settlements
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid settlement amount" });
    }

    // create settlement
    const settlement = await Settlement.create({
      groupId,
      from,
      to,
      amount: Number(amount),
      expenseId,
    });

    // populate names for frontend
    const populatedSettlement = await Settlement.findById(settlement._id)
      .populate("from", "name")
      .populate("to", "name");

    res.status(201).json(populatedSettlement);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Settlement failed" });
  }
});


/* ================= GET GROUP SETTLEMENTS ================= */

router.get("/group/:groupId", authMiddleware, async (req, res) => {
  try {
    const settlements = await Settlement.find({
      groupId: req.params.groupId,
      amount: { $gt: 0 }   // 🚫 hide zero settlements
    })
      .populate("from", "name")
      .populate("to", "name")
      .sort({ createdAt: -1 });

    res.json(settlements);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch failed" });
  }
});


/* ================= DELETE (UNDO) SETTLEMENT ================= */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const settlement = await Settlement.findByIdAndDelete(req.params.id);

    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found" });
    }

    res.json({ message: "Settlement undone successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to undo settlement" });
  }
});


/* ================= USER RECENT ACTIVITY ================= */

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const settlements = await Settlement.find({
      $and: [
        {
          $or: [
            { from: req.user.id },
            { to: req.user.id },
          ],
        },
        { amount: { $gt: 0 } }   // 🚫 hide zero settlements
      ]
    })
      .populate("from", "name")
      .populate("to", "name")
      .sort({ createdAt: -1 });

    res.json(settlements);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load activity" });
  }
});


module.exports = router;
