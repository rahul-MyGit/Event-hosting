const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
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
    if(user){
      generateTokenAndSetCookie(user.id, res);
      res.status(201).json({ message: 'User created successfully', userId: user.id });
    }else{
      res.status(400).json({ message: "Error creating user" });
      return;
    }
    
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

    console.log(user.id);
    generateTokenAndSetCookie(user.id, res);
    
    res.json({ message: 'User logged in successfully', user});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

const logout = async (req,res) =>{
  try {
      res.cookie("jwt", "", {maxAge: 0})
      res.status(200).json({msg: "Logged out successfully"})
  } catch (error) {
      console.log("Error in logout controller", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

const me = async (req, res) => {
  const userId = req.user;
  console.log(userId);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId.id },
      include: {
        events: true, // Include related events
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude sensitive information like password
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
}


module.exports = {
  signup,
  login,
  me,
  logout,
};