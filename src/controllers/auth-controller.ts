import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmptyFields } from "../helpers/validate-empty-fields";
import { validateEmail } from "../helpers/validate-email";
import userModel from '../models/user-model';

const JWT_SECRET = process.env.JWT_SECRET!;
const saltRounds = 10; // bcrypt salt rounds

async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  // validate fields
  if (validateEmptyFields({ name, email, password })) {
    res.status(400).json({ message: "All inputs is required!" });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email type!" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password must have at least 6 characters!" });
    return;
  }

  if (name.length < 2) {
    res.status(400).json({ message: "Name must have at least 2 characters!" });
    return;
  }

  // validate if user exists
  const existingUser = await userModel.getUserByEmail(email.toLowerCase());

  if (existingUser) {
    res.status(409).json({ message: "User already exists!" });
    return;
  }

  // hash password before save
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = {
    name,
    email,
    password: hashedPassword,
  };

  // create user
  const createdUser = await userModel.createUser(user);

  // create JWT token
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res
    .status(201)
    .json({ message: "User Created Successfully!", token });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  // validate fields
  if (validateEmptyFields({ email, password })) {
    res.status(400).json({ message: "All inputs is required!" });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: "Invalid email type!" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ message: "Password must have at least 6 characters!" });
    return;
  }

  // validate if user exists
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  // compare password with hashed password saved on db
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  // create JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "User Logged Successfully!", token });
}

export default { login, register };
