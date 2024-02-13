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
const moment = require("moment");

router.get("/stats/:userId/:range", async (req, res) => {
  try {
    const userId = req.params.userId;
    const range = req.params.range.toLowerCase(); // Convert range to lowercase for easier comparison

    // Fetch transactions for the given userId
    let transactions;
    if (range === "all") {
      transactions = await Transaction.find({ userId: userId });
    } else if (range === "year") {
      const startDate = moment().subtract(12, "months").startOf("day"); // Start date: 12 months ago from today
      transactions = await Transaction.find({
        userId: userId,
        date: { $gte: startDate.toDate() }, // Fetch transactions from startDate onwards
      });
    } else if (range === "month") {
      const startDate = moment().subtract(30, "days").startOf("day"); // Start date: 30 days ago from today
      transactions = await Transaction.find({
        userId: userId,
        date: { $gte: startDate.toDate() }, // Fetch transactions from startDate onwards
      });
    } else {
      return res.status(400).json({ message: "Invalid range parameter" });
    }

    // If no transactions found for the user
    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for the user" });
    }

    // Group transactions per day
    const groupedTransactions = {};
    transactions.forEach((transaction) => {
      const day = moment(transaction.date).format("YYYY-MM-DD");
      if (!groupedTransactions[day]) {
        groupedTransactions[day] = [];
      }
      groupedTransactions[day].push(transaction);
    });

    // Extract necessary data for the chart
    const incomeData = [];
    const expenseData = [];
    const labels = [];

    Object.keys(groupedTransactions).forEach((day) => {
      let totalIncome = 0;
      let totalExpense = 0;
      groupedTransactions[day].forEach((transaction) => {
        if (transaction.isExpense) {
          totalExpense += transaction.amount;
        } else {
          totalIncome += transaction.amount;
        }
      });
      incomeData.push(totalIncome);
      expenseData.push(totalExpense);
      labels.push(day);
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

router.get("/stats-number/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch transactions based on the specified range
    const transactions = await Transaction.find({ userId: userId });

    // If no transactions found for the user
    if (!transactions) {
      return res
        .status(404)
        .json({ message: "No transactions found for the user" });
    }

    // Extract necessary data for the stats
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.isExpense) {
        totalExpense += transaction.amount;
      } else {
        totalIncome += transaction.amount;
      }
    });

    // Calculate remaining amount
    const remainingAmount = totalIncome - totalExpense;

    // Send the formatted data back in the response
    res.status(200).json({
      totalIncome,
      totalExpense,
      remainingAmount,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
