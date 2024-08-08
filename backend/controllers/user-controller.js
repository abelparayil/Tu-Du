import User from '../models.js/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Registration failed, please try again later' });
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hashSync(password);

  let user;

  try {
    user = new User({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Registration failed, please try again later' });
  }

  if (!user) {
    return res
      .status(500)
      .json({ message: 'Registration failed, please try again later' });
  }

  user = await user.save();

  return res.status(201).json({ message: 'User registered successfully' });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Login failed, please try again later' });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  const isPasswordCorrect = await bcrypt.compareSync(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign(
    {
      email: existingUser.email,
      id: existingUser._id,
      name: existingUser.name,
    },
    process.env.JWT_SECRET
  );

  return res
    .status(200)
    .json({ message: 'Login successful', userId: existingUser._id, token });
};

export const userResetPassword = async (req, res, next) => {
  const userId = req.userId.id;
  const newPassword = req.body.newPassword;

  let existingUser;

  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User doens't exist" });
  }

  const hashedPassword = bcrypt.hashSync(newPassword);

  try {
    existingUser.password = hashedPassword;
    existingUser = await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: 'Unexpected error occured' });
  }

  return res.status(200).json({ message: 'Password reset successful' });
};
