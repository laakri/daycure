const express = require("express");
const router = express.Router();
const Wallet = require("your models path/Wallet");

// Create a wallet
router.post("/wallet", async (req, res) => {
  try {
    const wallet = new Wallet(req.body);
    await wallet.save();
    res.status(201).send(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all wallets
router.get("/wallets", async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.send(wallets);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get wallet by ID
router.get("/wallet/:id", async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return res.status(404).send();
    }
    res.send(wallet);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update wallet by ID
router.patch("/wallet/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["categories", "maxBudget"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const wallet = await Wallet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!wallet) {
      return res.status(404).send();
    }

    res.send(wallet);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete wallet by ID
router.delete("/wallet/:id", async (req, res) => {
  try {
    const wallet = await Wallet.findByIdAndDelete(req.params.id);

    if (!wallet) {
      return res.status(404).send();
    }

    res.send(wallet);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
