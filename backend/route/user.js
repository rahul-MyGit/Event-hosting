const express = require('express');
const protectRoute = require("../middleware/protectRoute");
const { updateUserProfile, getUserDetails } = require('../controller/user');
const userRouter = express.Router();


userRouter.put('/update',protectRoute, updateUserProfile); // both of them
userRouter.get('/users/:id', protectRoute, getUserDetails) // not needed now 

module.exports = userRouter;