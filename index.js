//TODO:
// Add errorHandler Middleware
// Change flow to only one secret for token generation, change User Model

const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const { initializeDBConnection } = require('./database/initializeDbConnection');
const { routeNotFound } = require('./middlewares/routeNotFound');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//DO NOT MOVE, needs to be at top to establish connection before any functions execute
initializeDBConnection();

app.get('/', (req, res) => {
	res.send('Welcome to NFT Baazar!');
});

const { privateRoute } = require("./middlewares/privateRoute");
const productRouter = require('./routes/product.router');
const loginRouter = require('./routes/login.router');
const signupRouter = require('./routes/signup.router');
const wishlistRouter = require("./routes/wishlist.router");
const cartRouter = require("./routes/cart.router");

app.use('/product', productRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

// const wishlistRouter = require("./routes/wishlist.router");
// app.use("/wishlist", wishlistRouter);



//DO NOT MOVE, needs to be at the end to catch all routes that are not being handled by server
app.use(routeNotFound);

app.listen(3000, () => {
	console.log('server started');
});
