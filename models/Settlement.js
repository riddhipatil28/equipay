const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },

  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  // ⭐ ADD THIS (tracks which expense was settled)
  expenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expense",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Settlement", settlementSchema);
