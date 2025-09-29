require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

router.post("/Signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username, 
        email, 
        password: hashedPassword,
      }
    });

    const token = jwt.sign({ id: newUser.id }, process.env.TOKEN, { expiresIn: "1h" });
    console.log("siuc");
    
    return res.status(200).json({
      message: "Signup successful",
      user: { username, email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await prisma.user.findUnique({ where: { email } });
    if (!userData) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: userData.id }, process.env.TOKEN, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: userData.id,
        name: userData.username,
        email: userData.email,
      }, token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server issue" });
  }
});

module.exports = router;