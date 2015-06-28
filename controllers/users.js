// require mongoose and load the model that we are going to use
var mongoose = require('mongoose');
var User = mongoose.model('Friend');

// create an object with methods that we are going to export for our routes file to use
var mongs = {}
// index method (loads existing mongs and renders the index view)
mongs.index = function(req, res) {
	User.find({}, function(err, results) {
		if(err) {
			res.send('something went wrong!');
		} else {
			res.render('angular');

		}
	})
}
 

module.exports = mongs;