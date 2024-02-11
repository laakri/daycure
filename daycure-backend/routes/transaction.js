const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

router.post("/transaction", async (req, res) => {
  try {
    const { amount, description, userId, category, isExpense } = req.body;
    if (!amount || !userId) {
      return res
        .status(400)
        .json({ error: "Amount and userId are required fields." });
    }

    const transaction = new Transaction({
      amount,
      description,
      userId,
      category,
      isExpense,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error." });
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

// Route to get income and expense data for a user within a specific time period
router.get("/stats/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch transactions for the given userId
    const transactions = await Transaction.find({ userId: userId });
    console.log(transactions);
    // If no transactions found for the user
    if (!transactions) {
      return res
        .status(404)
        .json({ message: "No transactions found for the user" });
    }

    // Extract necessary data for the chart
    const incomeData = [];
    const expenseData = [];
    const labels = [];

    transactions.forEach((transaction) => {
      if (transaction.isExpense) {
        expenseData.push(transaction.amount);
      } else {
        incomeData.push(transaction.amount);
      }
      // Extracting month from transaction date
      labels.push(
        new Date(transaction.date).toLocaleString("default", { month: "short" })
      );
    });

    // Prepare the data object for the chart
    const chartData = {
      labels,
      series: [
        { name: "Income", data: incomeData },
        { name: "Expense", data: expenseData },
      ],
    };

    // Send the formatted data back in the response
    res.status(200).json({ chartData });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
