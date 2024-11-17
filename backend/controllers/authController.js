// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (password.length < 6) {
      return res.status(400).send({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ message: 'Logged in successfully', token ,success:true});
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};
