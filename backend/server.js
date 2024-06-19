const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter =  require('./route/auth');
const userRouter =require("./route/user");
const eventRouter = require('./route/event');


dotenv.config();
const protectRoute = require('./middleware/protectRoute');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


// Use the authentication routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);


// Example of a protected route
app.get('/protected-route', protectRoute, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});