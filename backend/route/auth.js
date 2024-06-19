const express = require("express");
const {signup, login, me, logout} = require('../controller/auth');
const protectRoute = require('../middleware/protectRoute');

const authRouter = express.Router();

authRouter.get('/me', protectRoute, me);
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);


module.exports=authRouter;