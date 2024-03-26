const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later.",
});

/*************-Signup-********** */
router.post("/signup", limiter, async (req, res, next) => {
  try {
    const emailExists = await User.exists({ email: req.body.email });
    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      walletCategories: [
        "Food",
        "Transportation",
        "Entertainment",
        "Utilities",
        "Shopping",
        "Healthcare",
        "Education",
      ],
    });
    const result = await user.save();
    res.status(201).json({
      message: "User created!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "An error occurred while creating the user.",
    });
  }
});
/*************-Login-********** */
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(409).json({
        message: "Incorrect email or password!.",
      });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(409).json({
        message: "Incorrect email or password!.",
      });
    }

    const token = jwt.sign(
      {
        name: user.name,
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      "secret_this_should_be_longer_secret_this_should_be_longer_secret_this_should_be_longer_secret_this_should_be_longer_",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user._id,
      userName: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({
      message: "Authentication failed. Incorrect email or password.",
    });
  }
});
router.post("/widgets/add", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { widget } = req.body;

    // Check if the widget already exists in the user's dashboard
    if (user.dashboardWidgets.includes(widget)) {
      return res.status(400).json({ message: "Widget already exists" });
    }

    // Add the widget to the user's dashboard
    user.dashboardWidgets.push(widget);
    await user.save();

    res.status(200).json({ message: "Widget added to dashboard" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/widgets/delete", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { widget } = req.body;

    if (!user.dashboardWidgets.includes(widget)) {
      return res.status(400).json({ message: "Widget not found in dashboard" });
    }

    user.dashboardWidgets = user.dashboardWidgets.filter((w) => w !== widget);
    await user.save();

    res.status(200).json({ message: "Widget deleted from dashboard" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/widgets", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ widgets: user.dashboardWidgets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
