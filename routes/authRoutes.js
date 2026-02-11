const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= GET ALL MEMBERS ================= */

router.get("/members", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      provider: "local",
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET LOGGED IN USER ================= */

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email phoneNumber provider googleId"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("GET ME ERROR:", err);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

/* ================= GOOGLE LOGIN ================= */

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(
      `http://localhost:5173/google-success?token=${token}`
    );
  }
);

module.exports = router;
