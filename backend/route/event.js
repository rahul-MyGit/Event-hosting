const express = require('express');
const protectRoute = require("../middleware/protectRoute");
const { getAllEvents, addEvent } = require('../controller/event');
const eventRouter = express.Router();


eventRouter.get('/events',protectRoute, getAllEvents);
eventRouter.post('/addEvent', protectRoute, addEvent)

module.exports = eventRouter;