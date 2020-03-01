/**
 * @author José Miranda
 * @email chemalug@gmail.com
 * @create date 2020-02-27 15:43:42
 * @modify date 2020-02-27 15:43:42
 * @desc [description]
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryp = require('bcrypt');

const userSchema = new Schema({
     email: String,
     password: String
});

userSchema.methods.encryptPassword = (password) => {
     return bcryp.hashSync( password, bcryp.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password) {
     return bcryp.compareSync(password, this.password);
}

module.exports = mongoose.model('users', userSchema);