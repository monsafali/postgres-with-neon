import { sql } from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1. Check if email already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already exists, please login" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save user with hashed password
    const response = await sql`
      INSERT INTO users(name, email, password)
      VALUES(${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;

    const user = response[0];

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "supersecret", // keep in .env
      { expiresIn: "1h" }
    );

    // 5. Save JWT in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    res.send("register");
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
    res.send("register");
  } catch (error) {}
};

export const forgot_password = async (req, res) => {
  try {
    res.send("register");
  } catch (error) {}
};

export const Reset_password = async (req, res) => {
  try {
    res.send("register");
  } catch (error) {}
};
