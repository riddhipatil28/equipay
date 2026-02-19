const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const Group = require("../models/Group");


/* =========================================================
   CREATE EXPENSE (EQUAL + UNEQUAL SPLIT SUPPORT)
========================================================= */

router.post("/", async (req, res) => {
  try {
    const {
      groupId,
      title,
      amount,
      category,
      paidBy,
      participants,
      splits,
    } = req.body;

    let finalSplits = [];

    /* ================= HANDLE SPLITS ================= */

    // If custom splits provided (unequal)
    if (splits && splits.length > 0) {

      const total = splits.reduce(
        (sum, s) => sum + Number(s.amount),
        0
      );

      if (total !== Number(amount)) {
        return res.status(400).json({
          message: "Split total must equal expense amount",
        });
      }

      finalSplits = splits;
    }

    // Otherwise auto equal split
    else if (participants && participants.length > 0) {

      const equalShare = Number(amount) / participants.length;

      finalSplits = participants.map((userId) => ({
        userId,
        amount: equalShare,
      }));
    }

    /* ================= CREATE EXPENSE ================= */

    const expense = await Expense.create({
      groupId,
      title,
      amount,
      category,
      paidBy,
      participants,
      splits: finalSplits,
      paidByMembers: [paidBy],
    });

    /* ================= ADD TO GROUP ================= */

    const group = await Group.findById(groupId);

    if (group) {
      group.expenses.push(expense._id);
      await group.save();
    }

    /* ================= SOCKET UPDATE ================= */

    req.app.get("io").to(groupId).emit("expense-updated");

    res.status(201).json(expense);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create expense" });
  }
});


/* =========================================================
   GET GROUP EXPENSES
========================================================= */

router.get("/:groupId", async (req, res) => {
  try {
    const expenses = await Expense.find({
      groupId: req.params.groupId,
    }).populate("paidBy participants paidByMembers");

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});


/* =========================================================
   MARK MEMBER PAID
========================================================= */

router.put("/pay/:expenseId/:userId", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Add member to paid list if not already added
    if (!expense.paidByMembers.includes(req.params.userId)) {
      expense.paidByMembers.push(req.params.userId);
    }

    // Mark settled if everyone paid
    if (expense.paidByMembers.length === expense.participants.length) {
      expense.isSettled = true;
    }

    await expense.save();

    req.app
      .get("io")
      .to(expense.groupId.toString())
      .emit("expense-updated");

    res.json(expense);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment update failed" });
  }
});


module.exports = router;
