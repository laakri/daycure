const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Route to get categories of a specific user
router.get("/categories/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.walletCategories);

    res.json(user.walletCategories);
  } catch (err) {
    console.error("Error getting categories:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to add a new category to a user's walletCategories array
router.post("/categories/:userId", async (req, res) => {
  const { category } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.walletCategories.push(category);
    await user.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to delete a category from a user's walletCategories array
router.delete("/categories/:userId/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.walletCategories = user.walletCategories.filter(
      (cat) => cat !== categoryId
    );
    await user.save();
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
