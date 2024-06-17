const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
const jwt =  require("jsonwebtoken");
const generateTokenAndSetCookie = require("../lib/utils/generateToken");

const prisma = new PrismaClient();

//TODO: zod
const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    console.log(user);
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15d' });
    res.json({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


module.exports = {
  signup,
  login,
};