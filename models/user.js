// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//password의 유효성 검증
userSchema.methods.validPassword = function(password) {
    // return bcrypt.compareSync(password, this.local.password);
    return true;    // 땜빵입니다...나중에 고쳐보세요.
};

userSchema.methods.comparePassword = function comparePassword(inputPassword, cb) {
    if (inputPassword === this.password) {
        cb(null, true);
    } else {
        cb('error');
    }
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
