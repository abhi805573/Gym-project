const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const nodemailer = require("nodemailer");

require("dotenv").config();

const userRouter = express.Router();

/* ===========================
   Nodemailer Configuration
=========================== */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email server is ready to send messages ✅");
  }
});

/* ===========================
   Generate 6-digit Token
=========================== */

const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/* ===========================
   REGISTER
=========================== */

userRouter.post("/register", async (req, res) => {
  try {
    let { firstName, lastName, email, password, role } = req.body;

    email = email.toLowerCase(); // ✅ important

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateToken();

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      verified: false,
    });

    await newUser.save();

    const verificationLink = `http://localhost:3000/verifytoken?token=${verificationToken}`;

    await transporter.sendMail({
      from: `"GymFlow Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - GymFlow",
      html: `
        <h2>Hello ${firstName} 👋</h2>
        <p>Your verification code is:</p>
        <h3>${verificationToken}</h3>
        <a href="${verificationLink}">Verify Email</a>
      `,
    });

    res.status(201).json({
      message: "User registered. Verification email sent.",
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed." });
  }
});

/* ===========================
   VERIFY EMAIL
=========================== */

userRouter.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid token." });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Verification failed." });
  }
});

/* ===========================
   LOGIN
=========================== */

userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase(); // ✅ important

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email first." });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed." });
  }
});

/* ===========================
   GET ALL USERS (Admin Dashboard)
=========================== */

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* ===========================
   FORGOT PASSWORD
=========================== */

userRouter.post("/forgot-password", async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = generateToken();
    user.verificationToken = resetToken;
    await user.save();

    const resetLink = `http://localhost:3000/forgot-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"GymFlow Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Your reset code:</p>
        <h3>${resetToken}</h3>
        <a href="${resetLink}">Reset Password</a>
      `,
    });

    res.status(200).json({ message: "Reset email sent." });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send reset email." });
  }
});

/* ===========================
   RESET PASSWORD
=========================== */

userRouter.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful." });

  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Reset failed." });
  }
});

module.exports = { userRouter };
