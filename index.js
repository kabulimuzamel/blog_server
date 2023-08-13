const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const startup = require('debug')('startup');
const app = express();
const userRouter = require('./routes/userRoute');
const blogRouter = require('./routes/blogRoute');
const loginRouter = require('./routes/loginRouter');

app.use(express.json());


const db = process.env.DB_URI;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => startup('Connected to the Mongo Database...'))
	.catch((err) => startup('Could not connect to the Mongo Database', err))

app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:3000` }))

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// Port

const port = process.env.PORT || 8080;
app.listen(port, () => {
    startup(`Listening on Port ${port}...`)
}); 