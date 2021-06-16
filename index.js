//TODO:
// Add errorHandler Middleware
// Change flow to only one secret for token generation, change User Model

const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const { intializeDBConnection } = require('./db/intializeDBConnection');
const { routeNotFound } = require('./middlewares/routeNotFound');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//DO NOT MOVE, needs to be at top to establish connection before any functions execute
intializeDBConnection();

app.get('/', (req, res) => {
	res.send('Welcome to NFT Baazar!');
});

const testRouter = require('./routes/test.router');
app.use('/test', testRouter);

const loginRouter = require('./routes/login.router');
app.use('/login', loginRouter);

const signupRouter = require('./routes/signup.router');
app.use('/signup', signupRouter);

//DO NOT MOVE, needs to be at the end to catch all routes that are not being handled by server
app.use(routeNotFound);

app.listen(3000, () => {
	console.log('server started');
});
