
// require path

// require express and create the express app
var express = require('express');
var app = express();
var path = require('path');
// require bodyParser for handling post data
var bodyParser = require('body-parser');
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
app.use(bodyParser.urlencoded());

// static content
app.use(express.static(path.join(__dirname, './static')));

// setting up views folder and ejs
app.set('views', path.join(__dirname, './views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// require the mongoose config file that connects to the db and loads all of the models
require('./config/mongoose');
// require the routes file and pass it the express app
require('./config/routes')(app);

	app.post('/users', function (req, res){
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route.  
    res.redirect('/')
});

// listen
var server = app.listen(8004, function() {
	console.log("listening on port 8004");
})

var io = require('socket.io').listen(server)  

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
	// socket.on('token', function(data) {
	// 	console.log('here')
	// 	stripe.charges.create({
	// 	  amount: data.amount*100, // amount in cents, again
	// 	  currency: "usd",
	// 	  source: data.use,
	// 	  description: "Example charge",
	// 	  application_fee: 1
	// 	}, function(err, charge) {
	// 	  if (err && err.type === 'StripeCardError') {
	// 	    console.log('declined');
	// 	  }
	// 	  else {
	// 	  	console.log(charge)
	// 	  	console.log(err)

	// 	  }
	// 	});
	// 	// console.log(data.use);
	// })
  console.log("WE ARE USING SOCKETS!");
})