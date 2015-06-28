// require mongoose
var mongoose = require('mongoose');

// create our schema
var UserSchema = new mongoose.Schema({
 name: String,
 age: Number
})
mongoose.model('Friend', UserSchema);


