const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const Group = require("../models/Group");

/* ================= CREATE EXPENSE ================= */

router.post("/", async (req, res) => {
  try {

    const expense = await Expense.create({
      ...req.body,
      paidByMembers: [req.body.paidBy],
    });

    const group = await Group.findById(req.body.groupId);

    if (group) {
      group.expenses.push(expense._id);
      await group.save();
    }

    req.app.get("io").to(req.body.groupId).emit("expense-updated");

    res.json(expense);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* ================= GET GROUP EXPENSES ================= */

router.get("/:groupId", async (req, res) => {

  const expenses = await Expense.find({ groupId: req.params.groupId })
    .populate("paidBy participants paidByMembers");

  res.json(expenses);
});

/* ================= MARK MEMBER PAID ================= */

router.put("/pay/:expenseId/:userId", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);

    if (!expense.paidByMembers.includes(req.params.userId)) {
      expense.paidByMembers.push(req.params.userId);
    }

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
    res.status(500).json(err);
  }
});

module.exports = router;
