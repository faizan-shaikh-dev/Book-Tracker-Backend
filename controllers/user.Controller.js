import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.models.js";

//Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User register with thi email" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({
      name,
      email,
      password: hashPassword,
    });

    return res
      .status(201)
      .json({ message: "User register Successfully", newUser:{
          name,
          email
      } });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

//Login User
export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Login scuccessfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
