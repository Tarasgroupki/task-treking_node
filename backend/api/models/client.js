const mongoose = require('mongoose');

let User = require('./user');
//import user from './user.js';
//export const User = mongoose.models.User || mongoose.model('User', user);

const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
     name: String,
     email: String,
     primary_number: String,
     secondary_number: String,
     address: String,
     zipcode: String,
     city: String,
     company_name: String,
     vat: String,
     company_type: String,
     user: {type: mongoose.Schema.Types.ObjectId, ref: User},
     industry_id: Number
});

//mongoose.model('User', userSchema);
//let UserSchema = new Schema({

//});

module.exports = mongoose.model('Client', clientSchema);