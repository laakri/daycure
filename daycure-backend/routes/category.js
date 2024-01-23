const express = require("express");
const router = express.Router();
const Category = require("your models path/Category");

// Create a category
router.post("/category", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get category by ID
router.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update category by ID
router.patch("/category/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["categoryName", "maxBudget"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).send();
    }

    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete category by ID
router.delete("/category/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).send();
    }

    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
