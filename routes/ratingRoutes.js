const express = require("express");
const router = express.Router();
const Rating = require("../models/Rating");
const authMiddleware = require("../middleware/authMiddleware");

/* SAVE OR UPDATE RATING */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { stars } = req.body;

    if (!stars || stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const rating = await Rating.findOneAndUpdate(
      { user: req.user.id },
      { stars },
      { new: true, upsert: true }
    );

    res.json(rating);
  } catch (err) {
    console.error("RATING SAVE ERROR:", err);
    res.status(500).json({ message: "Failed to save rating" });
  }
});

/* GET MY RATING */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const rating = await Rating.findOne({ user: req.user.id });
    res.json(rating);
  } catch (err) {
    console.error("RATING LOAD ERROR:", err);
    res.status(500).json({ message: "Failed to load rating" });
  }
});

module.exports = router;
