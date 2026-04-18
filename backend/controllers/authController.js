const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'customer' } = req.body;
    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser({ name, email, password: hashedPassword, role });

    return res.status(201).json({ message: 'User registered', userId });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    return res.status(200).json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
