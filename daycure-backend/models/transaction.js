const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  isExpense: {
    type: Boolean,
    default: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
