const express = require("express");
const router = express.Router();
const Transaction = require("your models path/Transaction");

// Create a transaction
router.post("/transaction", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get transaction by ID
router.get("/transaction/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).send();
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update transaction by ID
router.patch("/transaction/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["amount", "date", "description", "isExpense"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).send();
    }

    res.send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete transaction by ID
router.delete("/transaction/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).send();
    }

    res.send(transaction);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;