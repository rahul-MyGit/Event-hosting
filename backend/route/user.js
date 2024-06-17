const express = require('express');
const protectRoute = require("../middleware/protectRoute");
const { updateUserProfile } = require('../controller/user');
const userRouter = express.Router();

// userRouter.get('',protectRoute, abc);
// userRouter.get('',protectRoute, abc);
// userRouter.post('',protectRoute, abc);
userRouter.put('/update',protectRoute, updateUserProfile);


module.exports = userRouter;