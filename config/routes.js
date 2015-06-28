var mongs = require('../controllers/users');
var stripe = require("stripe")("sk_test_PIM4B5MJsDJSWsQ7ABuViwnb");

// var braintree = require('braintree');
// var gateway = braintree.connect({
// 	  environment: braintree.Environment.Sandbox,
// 	  merchantId: "4vg3wz9w3b8c62hh",
// 	  publicKey: "f8mtr5vrwwntjqvy",
// 	  privateKey: "f145b0307557b81cf3717e8fef944635"
// 	});

module.exports = function(app) {
	var id_customer;
	app.get('/', function(req, res) {
		// gateway.customer.create({
		//   firstName: "Jen",
		//   lastName: "Smith",
		//   company: "Braintree",
		//   email: "jen@example.com"
		// }, function (err, result) {

		//   result.success;
		//   // true

		//   result.customer.id;
		//   console.log(result.customer.id);
		//   id_customer = result.customer.id;
		//   // e.g. 494019
	// 	// });
	// 	gateway.clientToken.generate({
	// 	    customerId: id_customer
	// 	  }, function (err, response) {
	// 	  	 console.log('client token ' + response.clientToken)
	// 	    // res.send(response.clientToken);
	// 	  });
		mongs.index(req, res);
	})

	app.post('/charge', function(req, res) {
	    var stripeToken = req.body.stripeToken;
	    var amount = req.body.amount;
	    console.log(req.body);

	    stripe.charges.create({
	        card: stripeToken,
	        currency: 'usd',
	        amount: amount*100
	    },
	    function(err, charge) {
	        if (err) {
	            res.send(500, err);
	        } else {
	            res.send(204);
	        }
	    });
	});


	// app.post('/checkout', function (req, res) {
	// 	var nonce = req.body.payment_method_nonce;
	// 	console.log('nonce ' + nonce);
	// 	gateway.transaction.sale({
	// 	  amount: '10.00',
	// 	  paymentMethodNonce: 'fake-consumed-nonce',
	// 	}, function (err, result) {
	// 		console.log('done');
	// 		res.redirect('/');
	// 	});
	// })
}