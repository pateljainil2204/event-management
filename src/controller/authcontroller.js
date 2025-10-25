import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";
import logactivity from "../activity/activitylogger.js";
import { isNonEmptyString, isValidEmail, isValidPassword } from "../utils/validator.js";
import { UserRoles } from "../utils/enum.js";

const saltRounds = 10;

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input fields
    if (!isNonEmptyString(name) || !isValidEmail(email) || !isValidPassword(password)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === UserRoles.ADMIN ? UserRoles.ADMIN : UserRoles.MEMBER,
    });

    await logactivity(user._id, "User Registered");

    res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email) || !isNonEmptyString(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    await logactivity(user._id, "User Logged In");

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login };
