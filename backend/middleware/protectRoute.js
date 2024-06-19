const jwt =  require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

const  protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({message: "No token, authorization denied"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({message: "Token is not valid"});
    }

    console.log("decoded : " ,decoded);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        events: true, // Include related events
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
} catch (error) {
    console.log("Error in protectedRoute middleware", error.message);
    res.status(500).json({message: "Internal server error"});
}
}

module.exports = protectRoute;

