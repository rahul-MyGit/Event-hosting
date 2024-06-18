const express = require('express');
const protectRoute = require("../middleware/protectRoute");
const { getAllEvents } = require('../controller/event');
const eventRouter = express.Router();


eventRouter.get('/events',protectRoute, getAllEvents);


module.exports = eventRouter;